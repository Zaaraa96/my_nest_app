import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class GeneralResponseMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        // console.log(req);
        // console.log(res);
        
        // if (res.status == 200) {
        //     console.log('res is ok');
            
            // code = code || 200;
            // res.status(code).json({
            //   status: "ok",
            //   data: data || {},
            //   msg: msg,
            // });
        // }

        // res.err = (code, error) => {
        //     console.log(error);
        //     code = code || 500;
            // if([ERRORS.noAnswerFound, ERRORS.noQuestionFound, ERRORS.noReportFound, ERRORS.noUserFound,
            //   ERRORS.noNormalUserFound, ERRORS.noConsultantFound, ERRORS.noTopicFound, ERRORS.noTagFound,
            //   ERRORS.noFileFound, ERRORS.noOrderFound,ERRORS.noPaymentFound , ERRORS.noBannerFound, ERRORS.noNotificationFound
            // ].includes(error?.exceptionCode))
            //   code=404;
        //     res.status(code).json({
        //       status: "err",
        //       errorCode: error?.exceptionCode?? 0,
        //       msg: error?.exceptionMessage?? '',
        //     });
        //   };
        
        //   res.suc = (data, code, msg) => {
        //     code = code || 200;
        //     res.status(code).json({
        //       status: "ok",
        //       data: data || {},
        //       msg: msg,
        //     });
        //   };
        
        //   const myCustomLabels = {
        //     totalDocs: 'itemCount',
        //     docs: 'items',
        //     limit: 'perPage',
        //     page: 'currentPage',
        //     nextPage: 'next',
        //     prevPage: 'prev',
        //     totalPages: 'totalPages',
        //     pagingCounter: 'slNo',
        //     meta: 'paginator',
        //   };
        
        //   res.dbq = {}
        //   res.dbo = {
        //     page: 1,
        //     limit: 10,
        //     customLabels: myCustomLabels,
        //   }
        
        //   req.paging = {
        //     limit:10,
        //     page:1,
        //     skip:0
        //   }
        //   if (req.query) {
        //     let count = Number(req.query.count) || 10;
        //     let page = Number(req.query.page) || 1;
        //     if(count > 30) count =30;
        
        //     let skip = ((page-1) * count)
        
        //     res.dbo.page = page;
        //     res.dbo.limit = count;
            // req.paging = {
            //   limit:count,
            //   page:page,
            //   skip:skip,
            //   allowDiskUse: true
            // }
        //   }
          
          next();
    }
    
}


