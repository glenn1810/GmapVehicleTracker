using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GmapVehicleTracker.Model
{
    [Table(name:"VehicleRouteTracker")]
    public class VehicleRouteTracker
    {
        [Key]
        public long Id { get; set; }

        [Column(TypeName ="varchar(500)")]
        [Required]
        public string CompanyName { get; set; }
        [Column(TypeName = "varchar(500)")]
        [Required]
        public string Name { get; set; }
        [Column(TypeName = "varchar(max)")]
        [Required]
        public string Origin { get; set; }
        [Column(TypeName = "varchar(max)")]
        [Required]
        public string Destination { get; set; }
        [Column(TypeName = "varchar(100)")]
        [Required]
        public string Status { get; set; }

        [Column(TypeName = "decimal(9, 2)")]
        [Required]
        public decimal Revenue { get; set; }
    }
}
