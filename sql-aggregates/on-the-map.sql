select "co"."name",
      count("ci".*) as "numberOfCities"
  from "countries" as "co"
  join "cities" as "ci" using ("countryId")
group by "co"."name";
