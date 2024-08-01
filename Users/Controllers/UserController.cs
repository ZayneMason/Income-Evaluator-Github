using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAPI.Context;
using UserAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserContext _context;
        private readonly IConfiguration _configuration;

        public UserController(UserContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userData)
        {
            if (userData == null)
            {
                return BadRequest(new { Message = "Invalid credentials." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userData.Username && u.Password == userData.Password);

            if (user == null)
            {
                return NotFound(new { Message = "User not found with provided credentials." });
            }

            var token = GenerateJwtToken(user);

            // Set the token as an HttpOnly cookie
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            Response.Cookies.Append("userID", user.Id.ToString());

            return Ok(new { token, userId = user.Id });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userData)
        {
            if (userData == null)
            {
                return BadRequest(new { Message = "Invalid user details." });
            }
            if (string.IsNullOrEmpty(userData.Username) || string.IsNullOrEmpty(userData.Password) || string.IsNullOrEmpty(userData.FirstName) || string.IsNullOrEmpty(userData.LastName))
            {
                return BadRequest(new { Message = "Invalid user details." });
            }
            if (await _context.Users.FirstOrDefaultAsync(u => u.Username == userData.Username) != null)
            {
                return BadRequest(new { Message = "Username taken." });
            }

            await _context.AddAsync(userData);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Registered user." });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
