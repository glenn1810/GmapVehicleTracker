using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GmapVehicleTracker.Data.Contract;
using GmapVehicleTracker.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GmapVehicleTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleRouteTrackerController : ControllerBase
    {

        private readonly ILogger<VehicleRouteTrackerController> _logger;
        private IRepositoryWrapper _repoWrapper;

        public VehicleRouteTrackerController(ILogger<VehicleRouteTrackerController> logger,
            IRepositoryWrapper repoWrapper)
        {
            _logger = logger;
            _repoWrapper = repoWrapper;
        }

        // GET: api/<VehicleRouteTrackerController>
        [HttpGet]
        public IEnumerable<VehicleRouteTracker> Get()
        {
            var vehicleRoutes = _repoWrapper.Gmap.GetAllVehicleRoute();

            return vehicleRoutes;
        }

        // POST api/<VehicleRouteTrackerController>
        [HttpPost]
        public IActionResult CreateRoute([FromBody] VehicleRouteTracker route)
        {
            try
            {
                if (route == null)
                {
                    _logger.LogError("Owner object sent from client is null.");
                    return BadRequest("Owner object is null");
                }
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid owner object sent from client.");
                    return BadRequest("Invalid model object");
                }

                _repoWrapper.Gmap.AddNewRouteTracker(route);
                _repoWrapper.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateOwner action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
