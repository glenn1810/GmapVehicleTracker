
BEGIN
IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'VehicleRouteTracker'))
	BEGIN
	  TRUNCATE TABLE dbo.VehicleRouteTracker

	  INSERT INTO DBO.VehicleRouteTracker
	  (
		  CompanyName,
		  Name,
		  Origin,
		  Destination,
		  Status,
		  Revenue
	  )
	  VALUES
	  (   'A CORP', -- CompanyName - varchar(500)
		  'Bus A', -- Name - varchar(500)
		  'BGC Corporate Center, 30th St, Taguig, 1634 Metro Manila', -- Origin - varchar(max)
		  'B. Morcilla St, Pateros, 1620 Metro Manila', -- Destination - varchar(max)
		  'Ready',  -- Status - varchar(100)
		  4356.12
	   )


	   INSERT INTO DBO.VehicleRouteTracker
	  (
		  CompanyName,
		  Name,
		  Origin,
		  Destination,
		  Status,
		  Revenue
	  )
	  VALUES
	  (   'B CORP', -- CompanyName - varchar(500)
		  'Bus B', -- Name - varchar(500)
		  'Fully Booked Ground Floor, B6, Bonifacio High Street Taguig Metro Manila Philippines', -- Origin - varchar(max)
		  'Fifth Avenue Place 5th Avenue corner 21st Dr Taguig 1630 Metro Manila', -- Destination - varchar(max)
		  'Ready',  -- Status - varchar(100)
		  8999.08
	   )

	   INSERT INTO DBO.VehicleRouteTracker
	  (
		  CompanyName,
		  Name,
		  Origin,
		  Destination,
		  Status,
		  Revenue
	  )
	  VALUES
	  (   'C CORP', -- CompanyName - varchar(500)
		  'Bus C', -- Name - varchar(500)
		  'Ridgewood Towers Taguig Carlos P.Garcia Ave Taguig 1632 Metro Manila Philippines', -- Origin - varchar(max)
		  'Iglesia Ni Cristo - Lokal ng Pembo Milflores Makati Metro Manila Philippines', -- Destination - varchar(max)
		  'Ready',  -- Status - varchar(100)
		  6500.32
	   )

	END
END

