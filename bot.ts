// import { Telegraf } from 'telegraf';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from 'src/app.module';
// import { UserService } from 'src/user/user.service';

// // Create an instance of Telegraf bot
// export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');
// const WebUrl = 'https://4fv0hkkm-3000.euw.devtunnels.ms';
// // Launch the bot and listen for messages

// async function launchBot() {
//   const app = await NestFactory.create(AppModule);
//   const userService = app.get(UserService); // Get UserService instance

//   bot.start(async (ctx) => {
//     const user = ctx.from;
//     const startPayload = ctx.startPayload; // Referral ID

//     let existingUser = await userService.findUserByTelegramId(
//       user.id.toString(),
//     );

//     if (!existingUser) {
//       existingUser = await userService.createUser(
//         user.id.toString(),
//         user.first_name,
//         user.last_name,
//         user.username,
//         startPayload || null,
//       );
//       // ctx.reply(`Welcome, ${user.first_name}! Your account has been created.`);
//     } else {
//       // ctx.reply(
//       //   `Welcome back, ${user.first_name}! Your account is already registered.`,
//       // );
//     }
//     await ctx.reply(`Click the button below to open the mini app.`, {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: 'Open Mini App',
//               web_app: {
//                 url: WebUrl,
//               },
//             },
//           ],
//         ],
//       },
//     });
//   });

//   // Start the bot
//   await bot.launch();
//   console.log('Bot is running...');
// }

// launchBot();
