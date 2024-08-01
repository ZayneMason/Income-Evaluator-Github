using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxDataAPI.Context;
using WebAPI.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateTaxDataController : ControllerBase
    {
        private readonly StateContext _context;

        public StateTaxDataController(StateContext context)
        {
            _context = context;
        }
        
        [HttpGet("{state}")]
        public async Task<ActionResult<IEnumerable<ZipCode>>> GetZipCode(string state)
        {
            var stateData = await _context.StateTaxData.Where(s => s.StateAbbreviation == state).OrderBy(s => s.AGISize).ToListAsync();

            if (stateData == null)
            {
                return NotFound();
            }

            return Ok(stateData);
        }

        [HttpGet("validate-state/{state}")]
        public async Task<ActionResult<Boolean>> ValidateState(string state)
        {
            var stateData = await _context.StateTaxData.FirstAsync(s => s.StateAbbreviation == state);

            if (stateData == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }
    }
}
