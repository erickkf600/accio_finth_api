import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Buy from 'App/Models/Buy'
import Instalment from 'App/Models/Instalment'
import Payment from 'App/Models/Payment'

export default class PurchasesController {

  public async show(ctx: HttpContextContract) {
    const year: number = ctx.params.year;
    const buy: any = Buy.query()
    .whereHas('instalments', (instalmentsQuery) => {
      instalmentsQuery.where('year', year)
    }, '>', 0)
    .preload('card', (cardQuery) => {
      cardQuery.select('inicial_num', 'name', 'type', 'flag')
    })
    .preload('user', (userQuery) =>{
      userQuery.select('name')
    })
    .preload('instalments', (instalmentsQuery) =>{
      instalmentsQuery.select('instalment_num', 'total_instalments', 'instalment_value', 'mounth_ref', 'year')
      instalmentsQuery.where('year', year)
      instalmentsQuery.preload('month')
    })

    return buy
  }

  public async showByMonth(ctx: HttpContextContract) {
    const monthId: number = ctx.params.month;
    const instalment: any = Instalment.query()
    .where('mounth_ref', monthId)
    return instalment
  }
  public async showByUser(ctx: HttpContextContract) {
    const user: number = ctx.params.user;
    const monthId: number = ctx.params.month;
    const year: number = ctx.params.year;
    const instalment: any[] = []

    const buy: any = await Buy.query()
    .select('id', 'buy_name', 'card_id')
    .where('user_id', user)
    .whereHas('instalments', (instalmentsQuery) => {
      instalmentsQuery.where('year', year)
      instalmentsQuery.andWhere('mounth_ref', monthId)
    }, '>', 0)
    .preload('instalments', (instalmentsQuery) =>{
      instalmentsQuery.select('id', 'instalment_num', 'total_instalments', 'instalment_value')
      instalmentsQuery.where('mounth_ref', monthId)
      instalmentsQuery.andWhere('user_id', user)
      instalmentsQuery.andWhere('year', year)
    })
    .preload('card', (cardQuery) => {
      cardQuery.select('id', 'inicial_num', 'name', 'type', 'flag')
    })

    buy.map(el => {
      instalment.push({
        id: el.id,
        buy_name: el.buy_name,
        instalment_num: el.instalments[0].instalment_num,
        total_instalments: el.instalments[0].total_instalments,
        instalment_value: el.instalments[0].instalment_value,
        card_id: el.card_id,
        card_name: el.card.name,

      })
    })

    return instalment
  }
  public async ShowBebiters(ctx: HttpContextContract) {
    const monthId: number = ctx.params.month;
    const year: number = ctx.params.year;

    const buy: any = await Buy.query()
    .groupBy('user_id')
    .select('id', 'user_id')
    .whereHas('instalments', (instalmentsQuery) => {
      instalmentsQuery.where('year', year)
      instalmentsQuery.andWhere('mounth_ref', monthId)
    }, '>', 0)
    .preload('user', (userQuery) =>{
      userQuery.select('id', 'name')
    })

    const installment = await Instalment.query()
    .groupBy('user_id')
    .select('instalment_value')
    .select(Database.raw('round(sum(instalment_value), 2) as instalment_value'))
    .whereIn('user_id', buy.map(el => (el.user_id)))
    .andWhere('mounth_ref', monthId)
    .andWhere('year', year)

    const payment = await Payment.query()
    .select('payed_value', 'user_id')
    .groupBy('user_id')
    .select(Database.raw('round(sum(payed_value), 2) as payed_value'))
    .whereIn('user_id', buy.map(el => (el.user_id)))
    .andWhere('mounth_ref', monthId)


    const final = buy.map((el, i) => (
      Object.assign(el, {
        total: installment[i].instalment_value,
        payed: !!payment[i]?.payed_value ? +Math.abs(payment[i].payed_value * 100 / installment[i].instalment_value).toFixed(2) : 0
      })
    ))
    return final
  }

  public async updatePurchase(ctx: HttpContextContract) {
    const id: number = ctx.params.id;
    const body: any = ctx.request.body()

    const buy: any = await Buy.findOrFail(id)
    const installment: any = await Instalment.query()
    .where('buy_id', id)
    .andWhere('instalment_num', body.purchase_instalment)

    installment.instalment_value = +body.purchase_value
    installment.instalment_num = +body.purchase_instalment
    buy.buy_name = body.purch_name
    buy.card_id = +body.card

    return installment
  }

  public async deleteDebiter(ctx: HttpContextContract) {
    const id: number = ctx.params.id;
    const buy: any = await Buy.findOrFail(id)
    await buy.delete()
    return true
  }


}
