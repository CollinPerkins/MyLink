using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyLink.Services;
using MyLink.Models;
using Microsoft.AspNetCore.Identity;
using MyLink.Data;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.Extensions.Configuration;

namespace WebApi.Controllers
{
    [Authorize, ApiController, Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private UserManager<User> _userManager { get; set; }
        private ApplicationDbContext _context { get; set; }
        private IConfiguration _configuration { get; set; }

        public UsersController(UserManager<User> userManager, ApplicationDbContext context, IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
        }


        [AllowAnonymous, HttpPost]
        public async Task<IActionResult> Register([FromBody]UserLoginViewModel model) {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                user = new User { UserName = model.Username };
                var result = await _userManager.CreateAsync(user, model.Password);


                if (result.Succeeded)
                    return Ok(new { Message = "created succefully"});
                else
                    return BadRequest(new { Message = "username not created" });
            }
            else
                return BadRequest(new { Message = "username already taken"});
        }


        [AllowAnonymous, HttpPost]
        public async Task<IActionResult> Authenticate([FromBody]UserLoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Username);
            if(user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var result = _userManager.CheckPasswordAsync(user, model.Password);
            if (result == null)
                return BadRequest(new { message = "Username or password is incorrect" });



            return Ok(new
            {
                user,
                token = CreateJWT(user)
            });
        }

        private string CreateJWT(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = _configuration.GetSection("AppSettings").GetSection("Secret").Value;
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.Select(u=> new {
                u.UserName,
                u.Email,
                u.EmailConfirmed,
                u.FirstName,
                u.LastName,
                u.PhoneNumber

            }).ToList(); 
            return Ok(users);
        }

        public class UserLoginViewModel {
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}