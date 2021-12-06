with "filmProfit" as (
  select  "f"."title",
          "f"."replacementCost",
          "f"."description",
        sum("p"."amount") as "profit"
    from "payments" as "p"
    join "rentals" using ("rentalId")
    join "inventory" as "i" using ("inventoryId")
    join "films" as "f" using ("filmId")
  group by "f"."filmId"
), "filmCost" as (
  select "f"."title",
      count(*) as "totalFilms"
    from "films" as "f"
    join "inventory" using ("filmId")
  group by "f"."title"
)

select "title",
        "description",
        "profit" - ("totalFilms" * "replacementCost") as "totalProfit"
    from "filmProfit"
    join "filmCost" using ("title")
  order by "totalProfit" desc
  limit 5;
