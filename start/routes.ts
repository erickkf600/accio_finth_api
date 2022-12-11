import Route from "@ioc:Adonis/Core/Route";
import Mounth from 'App/Models/Mounth'
import Card from 'App/Models/Card'
import User from 'App/Models/User'
import Type from 'App/Models/Type'
import Operation from 'App/Models/Operation'

Route.get("/", () => "ACCIO FINTH API");

Route.get("/months", async () => await Mounth.query().orderBy('num'));
Route.get("/cards", async () => await Card.query().select('id', 'inicial_num', 'name', 'flag', 'type'));
Route.get("/users", async () => await User.query().select('id', 'name', 'user', 'email'));
Route.get("/assets", async () => await Type.query().select('id', 'title', 'full_title'));
Route.get("/operation-types", async () => await Operation.query().select('id', 'title', 'full_title'));

Route.post("/register", async (ctx) => {
  const { default: BuyCrudsController } = await import(
    "App/Controllers/Http/BuyCrudsController"
  );
  return new BuyCrudsController().register(ctx);
});

Route.patch("/purchases/:id", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().updatePurchase(ctx);
});
Route.get("/purchases/:year", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().show(ctx);
});

Route.get("/purchases-by-month/:month", async (ctx) => {
  const { default: PurchasesController } = await import(
    "App/Controllers/Http/PurchasesController"
  );
  return new PurchasesController().showByMonth(ctx);
});
Route.get("/purchases-by-user/:user/:month/:year", async (ctx) => {
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

Route.get("/wallet/hostory-aports/:year", async (ctx) => {
  const { default: InvestmentsWalletsController } = await import(
    "App/Controllers/Http/InvestmentsWalletsController"
  );
  return new InvestmentsWalletsController().aportsHistory(ctx);
});

Route.get("/wallet/assets-list", async () => {
  const { default: InvestmentsWalletsController } = await import(
    "App/Controllers/Http/InvestmentsWalletsController"
  );
  return new InvestmentsWalletsController().assetsList();
});

Route.get("/moviments/", async () => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().show();
});
Route.get("/moviments/:year", async (ctx) => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().showByYear(ctx);
});
Route.get("/moviments/:year/:page/:limit", async (ctx) => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().showByYearPaginated(ctx);
});
Route.post("/moviments/", async (ctx) => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().register(ctx);
});

Route.patch("/moviments/:id", async (ctx) => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().update(ctx);
});
Route.delete("/moviments/:id", async (ctx) => {
  const { default: InvestmentsMovementsController } = await import(
    "App/Controllers/Http/InvestmentsMovementsController"
  );
  return new InvestmentsMovementsController().deleteMov(ctx);
});


