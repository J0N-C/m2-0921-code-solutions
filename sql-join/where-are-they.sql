select  "a"."line1" as "address",
        "a"."district",
        "ci"."name" as "city",
        "co"."name" as "country"
  from "addresses" as "a"
  join "cities" as "ci" using ("cityId")
  join "countries" as "co" using ("countryId")
