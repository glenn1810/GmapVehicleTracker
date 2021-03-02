using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Model
{
    public class WayPoints
    {
        [Key]
        public long Id { get; set; }

        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal WayPointLat { get; set; }
        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal WayPointLong { get; set; }
    }
}
