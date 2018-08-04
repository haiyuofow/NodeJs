/***
init 数据导入处理
**/
insert into henrydata.收入支出(交易类型,类别,子类,账户,花费,人员,商家,事件,日期,详细,地址) 
select 交易种类,类别,子类,账户1,花费,人员,商家,事件,日期,详细,地址编号
from henrydata.收支表



SELECT * FROM henrydata.收入支出 where date(日期) = '2018-06-15';
SELECT *  FROM henrydata.收入支出 where 修改时间 is not NULL;

select count(*) from henrydata.收入支出 where 修改时间 is not NULL;

select max(日期) from henrydata.收入支出 ;
delete from henrydata.收入支出 where ID >4102 and 日期 ='2018-08-03 00:00:00';
select  *  from henrydata.收入支出 where ID =4265 ;
select  *  from henrydata.收入支出 where 日期 ='2018-08-03 00:00:00';