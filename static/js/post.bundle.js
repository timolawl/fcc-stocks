!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function createChart(seriesOptions){Highcharts.stockChart(document.querySelector(".chart"),{rangeSelector:{selected:4},yAxis:{labels:{formatter:function(){return(this.value>0?" + ":"")+this.value+"%"}},plotLines:[{value:0,width:2,color:"silver"}]},plotOptions:{series:{compare:"percent",showInNavigator:!0}},tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',valueDecimals:2,split:!0},series:seriesOptions})}function checkLastUpdate(date){var sameDate=!1,lastUpdated=new Date(date),now=new Date;return lastUpdated.getUTCDate()===now.getUTCDate()&&lastUpdated.getUTCMonth()===now.getUTCMonth()&&lastUpdated.getUTCFullYear()===now.getUTCFullYear()&&(sameDate=!0),sameDate}function generateStockUIElement(stockName,companyName,index){var highchartColors=Highcharts.getOptions().colors;if(index%2==0){var newRow=document.createElement("div");newRow.classList.add("row"),document.querySelector(".stocks").appendChild(newRow)}var stockWrapper=document.createElement("div");stockWrapper.className="wrapper--stock medium-6 large-6 columns",document.querySelector(".stocks").lastChild.appendChild(stockWrapper);var stock=document.createElement("div");stock.className="stock",stock.style.border="1px solid "+highchartColors[index],stock.setAttribute("data-border-color",highchartColors[index]),stockWrapper.appendChild(stock);var ticker=document.createElement("div");ticker.classList.add("stock__ticker"),ticker.textContent=stockName,stock.appendChild(ticker);var company=document.createElement("div");company.classList.add("stock__company-name"),company.textContent=companyName,stock.appendChild(company);var remove=document.createElement("button");remove.className="hollow button alert stock__remove",remove.setAttribute("type","button"),stock.appendChild(remove);var srClose=document.createElement("span");srClose.classList.add("show-for-sr"),srClose.textContent="Close",remove.appendChild(srClose);var close=document.createElement("span");close.classList.add("stock__remove--icon"),close.setAttribute("aria-hidden","true"),close.innerHTML="&times;",remove.appendChild(close),remove.addEventListener("click",function(e){socket.emit("remove ticker",{ticker:stockName}),e.target.parentNode.parentNode.removeChild(e.target.parentNode)})}var socket=io();jQuery.ajaxPrefilter(function(options){options.crossDomain&&jQuery.support.cors&&(options.url="https://cors-anywhere.herokuapp.com/"+options.url)}),window.onload=function(){socket.on("error message",function(data){data.display?document.querySelector(".error-message").classList.remove("visibility--hide"):document.querySelector(".error-message").classList.add("visibility--hide")}),socket.emit("request tickers",{}),socket.on("update processed",function(data){socket.emit("request tickers",{})}),document.querySelector(".btn--submit").addEventListener("click",function(e){e.preventDefault(),document.querySelector(".form__input--add").value&&(socket.emit("add ticker",{ticker:document.querySelector(".form__input--add").value.toUpperCase()}),document.querySelector(".form__input--add").value="")}),document.querySelector(".btn--remove").addEventListener("click",function(e){e.preventDefault(),document.querySelector(".form__input--remove").value&&(socket.emit("remove ticker",{ticker:document.querySelector(".form__input--remove").value.toUpperCase()}),document.querySelector(".form__input--remove").value="")}),socket.on("repaint",function(data){for(var stocksNode=document.querySelector(".stocks");stocksNode.firstChild;)stocksNode.removeChild(stocksNode.firstChild);var seriesOptions=[],seriesCounter=0,names=data.stockTickers,to=new Date,from=new Date(to);from.setMonth(to.getMonth()-12);for(var urlFromSegment="&a="+from.getUTCMonth()+"&b="+from.getUTCDate()+"&c="+from.getUTCFullYear(),urlToSegment="&a="+to.getUTCMonth()+"&b="+to.getUTCDate()+"&c="+to.getUTCFullYear(),historicalURLs=names.map(function(stockTicker){return"http://real-chart.finance.yahoo.com/table.csv?s="+stockTicker+urlFromSegment+urlToSegment}),nameURLs=names.map(function(stockTicker){return"http://autoc.finance.yahoo.com/autoc?query="+stockTicker.toLowerCase()+"&region=1&lang=en"}),i=0;i<names.length;i++)!function(i){if(sessionStorage.getItem(names[i])&&checkLastUpdate(JSON.parse(sessionStorage.getItem(names[i])).lastUpdated)){var sessionStoredStock=JSON.parse(sessionStorage.getItem(names[i]));seriesOptions[i]={name:names[i],data:sessionStoredStock.data},seriesCounter+=1,generateStockUIElement(names[i],sessionStoredStock.company,i),seriesCounter===names.length&&createChart(seriesOptions)}else{var companyName="",today=new Date,sessionData=void 0,days=void 0,promise1=$.get(nameURLs[i]).then(function(data){companyName=data.ResultSet.Result[0].name,generateStockUIElement(names[i],companyName,i)}),promise2=$.get(historicalURLs[i],function(data){days=data.split(/\r\n|\n/).sort().map(function(row){var items=row.split(",");return[Date.parse(items[0]),parseFloat((+items[4]).toFixed(2))]}).filter(function(row,i){return row[0]&&0!==i})});Promise.all([promise1,promise2]).then(function(){sessionData={stock:names[i],company:companyName,data:days,lastUpdated:today},sessionStorage.setItem(names[i],JSON.stringify(sessionData)),seriesOptions[i]={name:names[i],data:days},(seriesCounter+=1)===names.length&&createChart(seriesOptions)})}}(i)})}},{}]},{},[1]);
//# sourceMappingURL=post.bundle.js.map
