import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buy from 'App/Models/Buy'
import Mounth from 'App/Models/Mounth'
import Instalments from 'App/Models/Instalment'
import Payment from 'App/Models/Payment'
import moment from 'moment'

export default class BuyCrudsController {
    public async register(ctx: HttpContextContract) {
        const body: any = ctx.request.body()
        const buys: any = []
        const month = await Mounth.all()
        body.forEach(async (el) =>{
          buys.push({
            buy_name: el.buy_name,
            user_id: el.user_id,
            card_id: el.card_id,
            obs: el.obs
          })
        })

        try {
        const buy = await Buy.createMany(buys)
        const teste = await this.registerInstalments(body, buy.map(b => b.id), month)
        return teste
       } catch (error) {
        throw {
          code: 4,
          message: "Ocorreu um erro ao cadastrar",
        };
       }

  }

  private async registerInstalments(body: any, fId: number[], munths: any[]) {
    const instalments: any[] = []
    const payment: any[] = []
    await body.forEach(async (el: any, i: number) => {
      let date = moment().month(el.mounth_ref - 1).year(el.year);
      payment.push({
        payed_value: 0,
        buy_id: fId[i],
        user_id: el.user_id,
        mounth_ref: munths.find(m => m.num === +date.format("MM"))?.id,

      });
      [...Array(el.instalments).keys()].map(async (_, ii) => {
        date.add(ii ,'month');
        instalments.push({
          mounth_ref: munths.find(m => m.num === +date.format("MM"))?.id,
          year: +date.format("YYYY"),
          instalment_num: ii+1,
          total_instalments: [...Array(el.instalments).keys()].length,
          instalment_value: el.value / [...Array(el.instalments).keys()].length,
          buy_id: fId[i],
          user_id: el.user_id
        });
      })
    });

    try {
      await Instalments.createMany(instalments)
      await Payment.createMany(payment)
      return true
    } catch (error) {
      console.log(error)
      throw {
        code: 4,
        message: "Ocorreu um erro ao cadastrar as parcelas",
      };
    }
  }
}
