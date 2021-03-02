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
        public string BusName { get; set; }
        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal OriginLat { get; set; }
        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal OriginLong { get; set; }

        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal DestinationLat { get; set; }
        [Column(TypeName = "Decimal(9, 6)")]
        [Required]
        public decimal DestinationLong { get; set; }

        [Column(TypeName = "decimal(9, 2)")]
        [Required]
        public decimal Revenue { get; set; }
    }
}
