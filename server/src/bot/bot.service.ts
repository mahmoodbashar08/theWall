import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { UserService } from '../user/user.service'; // Ensure UserService is injected properly

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf;

  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    console.log('Initializing Bot...');
    console.log('====================================');
    console.log(
      'process.env.TELEGRAM_BOT_TOKEN',
      process.env.TELEGRAM_BOT_TOKEN,
    );
    console.log('====================================');
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');

    this.bot.start(async (ctx) => {
      const user = ctx.from;
      const startPayload = ctx.startPayload; // Referral ID

      let existingUser = await this.userService.findUserByTelegramId(
        user.id.toString(),
      );

      if (!existingUser) {
        existingUser = await this.userService.createUser(
          user.id.toString(),
          user.first_name,
          user.last_name,
          user.username,
          startPayload || null,
        );
      }

      await ctx.reply(`Click the button below to open the mini app.`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open Mini App',
                web_app: {
                  url: 'https://4fv0hkkm-3000.euw.devtunnels.ms',
                },
              },
            ],
          ],
        },
      });
    });

    this.bot.on('pre_checkout_query', async (ctx) => {
      console.log('hiiii');
      try {
        await ctx.answerPreCheckoutQuery(true);
        console.log('Pre-checkout query answered successfully.');
      } catch (err) {
        console.log(err, 'Error in pre-checkout query handler');
      }
    });

    this.launchBot();
  }

  launchBot() {
    this.bot
      .launch()
      .then(() => {
        console.log('Bot is running...');
      })
      .catch((err) => {
        console.error('Error launching bot:', err);
      });
  }

  getBot(): Telegraf {
    return this.bot;
  }
}
