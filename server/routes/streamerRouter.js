const Router = require('express')
const router = new Router()
const streamerController = require('../controllers/streamerController')
const voteController = require('../controllers/voteController')

router.all('/', function (req,res,next) {
    if(req.method === 'GET') {
        streamerController.getAll(req, res, next)
    } else if (req.method === 'POST'){
        streamerController.create(req, res, next)
    }
})
router.get('/:id', streamerController.getOne)
router.put('/:id/vote',  voteController.create, streamerController.changeRating)

module.exports = router;



// const Router = require('express');
// const router = new Router();
// const streamerController = require('../controllers/streamerController');
// const voteController = require('../controllers/voteController');
// let isFetching = false;
// // Обработчик SSE для получения данных о стримерах
// router.get('/', async (req, res, next) => {

//     try {
//         // Если запрос уже выполняется, игнорируем повторные вызовы
//         if (isFetching) {
//           return;
//         }
    
//         res.setHeader('Content-Type', 'text/event-stream');
//         res.setHeader('Cache-Control', 'no-cache');
//         res.setHeader('Connection', 'keep-alive');
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.flushHeaders();
    
//         isFetching = true;
    
//         let streamers = await streamerController.getAll();
    
//         // Отправка данных о стримерах клиенту
//         res.write(`data: ${JSON.stringify(streamers)}\n\n`);
    
//         // Ваша логика для обновления данных о стримерах и отправки обновленных данных через SSE
    
//       } catch (error) {
//         console.log(error);
//         next(error);
//       } finally {
//         isFetching = false;
//       }












//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.flushHeaders();
// console.log(1)
//   // Ваша логика для получения данных о стримерах, например:
// //   const streamers = await streamerController.getAll();

// // //   // Отправка данных о стримерах клиенту
// //   res.write(`data: ${streamers}\n\n`);


// try {
//     let streamers = await streamerController.getAll();

//     // Отправка данных о стримерах клиенту
//     res.write(`data: ${JSON.stringify(streamers)}\n\n`);

//     // Ваша логика для обновления данных о стримерах и отправки обновленных данных через SSE

//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });






// streamerController.on('streamersUpdated', (updatedStreamers) => {
//     console.log(updatedStreamers)
//     res.write(`data: ${JSON.stringify(updatedStreamers)}\n\n`);
//   });
// console.log(2)
  // При обновлении данных о стримерах, повторно отправляем обновленные данные клиенту
  // Вам потребуется подключиться к соответствующим событиям или таймеру, чтобы определить момент обновления данных
  // и вызвать res.write() для отправки обновленных данных

  // Пример использования setInterval для обновления данных каждые 5 секунд
//   const intervalId = setInterval(() => {
//     const updatedStreamers = streamerController.getAll();
//     res.write(`data: ${JSON.stringify(updatedStreamers)}\n\n`);
//   }, 5000);
// console.log(3);
//   // Обработка закрытия соединения клиентом
//   req.on('close', () => {
//     clearInterval(intervalId);
//   });
// });