using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAPI.Context;
using UserAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PersonAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonContext _context;
        private readonly IConfiguration _configuration;

        public PersonController(PersonContext context, IConfiguration configuration)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpGet("collection/{userId}")]
        public async Task<ActionResult<IEnumerable<Person>>> GetUserPeople(int userId)
        {
            var peopleData = await _context.PeopleCollection.Where(p => p.UserID == userId).ToListAsync();

            if (peopleData == null || !peopleData.Any())
            {
                return NotFound();
            }

            return Ok(peopleData);
        }

        [HttpPost("collection/{userId}")]
        public async Task<ActionResult<Person>> AddPerson([FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.PeopleCollection.AddAsync(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserPeople), new { userId = person.UserID }, person);
        }

        [HttpPut("{personId}")]
        public async Task<IActionResult> UpdatePerson(int personId, [FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPerson = await _context.PeopleCollection.FindAsync(personId);
            if (existingPerson == null)
            {
                return NotFound();
            }

            existingPerson.FirstName = person.FirstName;
            existingPerson.LastName = person.LastName;
            existingPerson.ZipCode = person.ZipCode;
            existingPerson.UserID = person.UserID;
            existingPerson.Income = person.Income;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{personId}")]
        public async Task<IActionResult> DeletePerson(int personId)
        {
            var person = await _context.PeopleCollection.FindAsync(personId);
            if (person == null)
            {
                return NotFound();
            }

            _context.PeopleCollection.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // Helper method
        private bool PersonExists(int id)
        {
            return _context.PeopleCollection.Any(e => e.PersonID == id);
        }
    }
}
