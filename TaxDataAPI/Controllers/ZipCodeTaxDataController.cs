using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using TaxDataAPI.Context;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZipCodeTaxDataController : ControllerBase
    {
        private readonly ZipCodeContext _context;

        public ZipCodeTaxDataController(ZipCodeContext context)
        {
            _context = context;
        }

        [HttpGet("{zip}")]
        public async Task<ActionResult<IEnumerable<ZipCode>>> GetZipCode(int zip)
        {
            var zipCodeData = await _context.ZipCodeTaxData.Where(z => z.Zip == zip).OrderBy(z => z.AGISize).ToListAsync();

            if (zipCodeData == null)
            {
                return NotFound();
            }

            return Ok(zipCodeData);
        }

        [HttpGet("validate-zip/{zip}")]
        public async Task<ActionResult<IEnumerable<Boolean>>> ValidateZipCode(int zip)
        {
            var zipCodeData = await _context.ZipCodeTaxData.FirstAsync(z => z.Zip == zip);
            
            if (zipCodeData == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }
    }
}
