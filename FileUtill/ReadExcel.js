
//NodeJS读取excel中的内容并写入数据库中
var xl = require('node-xlrd');
var xlsx = require('node-xlsx');
var moment = require('Moment');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'haiyu199001',
  database : 'henrydata'
});
parser = {};



var add = '/Users/henry/Downloads/wjz_userdata_7A8C0EEB0D6D5F622466604CAA751713_2018-08-03.xls'
var add1 ='/Users/henry/Downloads/消费记录20110101-20180615.xlsx'

/**
 * 这是解析xls文件转换为数据库的文件
 * 该接口用于从邮件中解析账本并保存在数据库中
 * @param {} tmp 
 * 这是使用解析 微记账 软件导出到邮件中的数据，解析后保存到数据库中
 * 生效日期：2018-08-04
 * 失效日期：
 */
parser.parse_weijizhang_xls = function(tmp) {
  var srzc = [];//对应数据库中的 收入支出表
  var maxtime2;
  
  xl.open(tmp,
    function(err,bk){
      if(err) {console.log(err.name, err.message); return;}

      //获取最大的日期
      connection.connect();
      connection.query('select max(日期) as max from henrydata.收入支出 ', function(err, maxs, fields) {
          if (err) {
            console.log(err);
            return;
          };
  
     var  maxtime = moment(maxs[0].max,'yyyy-MM-ddTHH:mm:ss.SSSZ');
     maxtime2 = maxtime.unix();
     console.log('最大的日期 ', moment(maxtime).format('YYYY/MM/DD HH:mm:ss'));

     var sht = bk.sheets[0],
     rCount = sht.row.count,
     cCount = sht.column.count;
   console.log('  name = %s; index = %d; rowCount = %d; columnCount = %d', sht.name, 0, rCount, cCount);
   for(var rIdx = 1; rIdx < rCount; rIdx++){//首行是标题 去掉
     // console.log(sht.cell(rIdx,0))
    //  var tpp ={
    //    '交易类型':sht.cell(rIdx,3),
    //    // '类别':sht.cell(rIdx,1),
    //    子类:sht.cell(rIdx,4),
    //    账户:sht.cell(rIdx,13),
    //    花费:sht.cell(rIdx,5),
    //    人员:sht.cell(rIdx,14),
    //    商家:'',
    //    事件:sht.cell(rIdx,1),
    //    日期:sht.cell(rIdx,0),
    //    详细:sht.cell(rIdx,11)+'-分割线-'+sht.cell(rIdx,12),
    //    地址:sht.cell(rIdx,10),
    //    报销状态:sht.cell(rIdx,9)
    //  };
    var tpp=[sht.cell(rIdx,3),sht.cell(rIdx,4),sht.cell(rIdx,13),sht.cell(rIdx,5),sht.cell(rIdx,14),'',sht.cell(rIdx,1),sht.cell(rIdx,0),sht.cell(rIdx,11)+'-分割线-'+sht.cell(rIdx,12),sht.cell(rIdx,10),sht.cell(rIdx,9)]
     
     console.log(moment(tpp[7],'YYYY-MM-DD').unix())
     console.log(maxtime2)
     console.log(moment(tpp[7],'YYYY-MM-DD').unix() - maxtime2)
     if(moment(tpp[7],'YYYY-MM-DD').unix()-maxtime2>0){//次数取等于，因此为了保证数据的准备性，邮件里只接受 晚上7：00以后导出的数据
       srzc.push(tpp);
           const sql ='insert into henrydata.收入支出(交易类型,子类,账户,花费,人员,商家,事件,日期,详细,地址,报销状态) values (?,?,?,?,?,?,?,?,?,?,?);'
           console.log('sql:'+sql)
           
           connection.query(sql, tpp,function(err, results, fields) {
           if (err) {
             console.log(err);
             return;
           };
       
            console.log('The solution is: ', results);
             });
           
         }
   }

      connection.end();
      });


  
    

    //连接数据库并写入内容
 

    }
  )

};


parser.parse_caiwu_xls = function(tmp) {
  
  xl.open(tmp,
    function(err,bk){
      if(err) {console.log(err.name, err.message); return;}

      var sht = bk.sheets[0],
			rCount = sht.row.count,
			cCount = sht.column.count;
		console.log('  name = %s; index = %d; rowCount = %d; columnCount = %d', sht.name, 0, rCount, cCount);
		for(var rIdx = 0; rIdx < rCount; rIdx++){
			for(var cIdx = 0; cIdx < cCount; cIdx++){
				try{
					// console.log('  cell : row = %d, col = %d, value = "%s"', rIdx, cIdx, sht.cell(rIdx,cIdx));
				}catch(e){
					console.log(e.message);
				}
			}
		}
    }
  )


};

parser.parse_caiwu_xlsx=function(tmp){

  var obj = xlsx.parse(tmp);
  var excelObj=obj[0].data;
  console.log(excelObj);
   
  var data = [];
  for(var i in excelObj){
      var value=excelObj[i];
      for(var j in value){
          console.log(value[j]);
      }
  }
  


}

// parser.parse_caiwu_xls(add);
// parser.parse_caiwu_xlsx(add1);
 var date = new Date(1899,12,41760-0.99999999);
// console.log(date);
// console.log(date.toLocaleString());
// console.log(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'));
// console.log(moment(date).format('YYYY/MM/DD HH:mm:ss'));
;
parser.parse_weijizhang_xls(add);


