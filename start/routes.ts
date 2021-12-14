import Route from "@ioc:Adonis/Core/Route";
import Mounth from 'App/Models/Mounth'
import Card from 'App/Models/Card'
import User from 'App/Models/User'

Route.get("/", () => "ACCIO FINTH API");

Route.get("/months", async () => await Mounth.query().orderBy('num'));
Route.get("/cards", async () => await Card.query().select('id', 'inicial_num', 'name', 'flag', 'type'));
Route.get("/users", async () => await User.query().select('id', 'name', 'user', 'email'));

Route.post("/register", async (ctx) => {
  const { default: BuyCrudsController } = await import(
    "App/Controllers/Http/BuyCrudsController"
  );
  return new BuyCrudsController().register(ctx);
});
Route.get("/purchases/:year", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().show(ctx);
});

Route.get("/purchases/:month", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().showByMonth(ctx);
});
Route.get("/purchases/:user/:month/:year", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().showByUser(ctx);
});
Route.get("/debiters/:month/:year", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().ShowBebiters(ctx);
});
Route.delete("/debiters/:id", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().deleteDebiter(ctx);
});

