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
    [Route("api/[controller]/[action]")]
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
        public ActionResult GetVehicleRoutes()
        {
            var vehicleRoutes = _repoWrapper.Gmap.GetAllVehicleRoute();

            var wayPoints = _repoWrapper.Gmap.GetWayPoints();

            var busRoutes = new List<BusRoutes>();

            foreach(var bus in vehicleRoutes)
            {
                var busWayPoints = new List<LatLong>();
                foreach (var waypoint in wayPoints)
                {
                    busWayPoints.Add(new LatLong()
                    {
                        Lat =waypoint.WayPointLat,
                        Long = waypoint.WayPointLong
                });
                }

                var busRoute = new BusRoutes()
                {
                    BusName = bus.BusName,
                    CompanyName = bus.CompanyName,
                    Revenue = bus.Revenue,
                    Destination = new LatLong()
                    {
                        Lat = bus.DestinationLat,
                        Long = bus.DestinationLong
                    },
                    Origin = new LatLong()
                    {
                        Lat = bus.OriginLat,
                        Long = bus.OriginLong
                    },
                    WayPoints = busWayPoints
                };

                busRoutes.Add(busRoute);
            }
            

            return Ok(busRoutes);
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
