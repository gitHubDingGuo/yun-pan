
var sures;
var namecm;

//创建文件夹
function createFile() {
	this.obj = document.getElementById('filesTab');
	//获取obj下的子内容
	this.child = this.obj.children;
	var fid = "";
	var str = "<tr data-file-id='2' class='active' >";
	str += "<td>";
	str += "<input type='checkbox' class='checkstyle' value='2' onclick='allcheck(),display()' />";
	str += "<i class='fileIcon'></i>";
	str += "<a onclick=\"\" href=\"javascript:void(0);\" class='acreateFile'><span class='fileTitle' title='新建文件夹' >新建文件夹</span></a>";
	str+="<div class=\"filesFns right\">";
	str+="<a class=\"icon icon-share\" href=\"javascript:;\">分享</a>";
	str+="<a onclick=\"\" class=\"icon icon-download\" href=\"javascript:;\">下载</a>";
	str+="<a class=\"icon icon-more\" href=\"javascript:;\">更多</a>";
	str+="</div>";
	str += "</td>";
	
	str += "<td>";
	
	str += "<span>——</span>";
	str += "</td>";
	str += "<td>";
	str += "<span class='fileChangeDate'>" + getNowFormatDate() + "	</span>";
	str += "</tr>";
	//拼接内容
	this.obj.innerHTML = str + this.obj.innerHTML;
	var obj = {
		title : "新建文件夹"
	};
	var name = "create";
	//创建文件夹时重命名
	rename(name,this.child[0], obj, function() {

		
	}, function() {
		this.obj.removeChild(this.child[0]);
	});
	
}

// 重命名
function rename(names,domObj, dataObj, success, fail) {
	var file = "";
	var _this = this;
	var moduleName = document.getElementById('moduleFlieName');
	var topNum = domObj.offsetTop, leftNum = domObj.offsetLeft;
	// 控制输入框的位置
	moduleName.style.display = 'block';
	moduleName.style.top = topNum + 37 + 'px';
	moduleName.style.left = leftNum + 'px';
	var oInput = moduleName.getElementsByTagName('input')[0];
	var aSpans = moduleName.getElementsByTagName('span');
	oInput.value = dataObj.title;
	// 将输入框中的东西全选中
	oInput.select();
	aSpans[0].onclick = function() {
		var newName = oInput.value;
		dataObj.title = newName;
		var a = document.getElementsByClassName('fileTitle');
		// 判断是否有重名现象
		var s = 0;
		var b = 0;
		var count = 0;
		for (var i = 0; i < a.length; i++) {
			if (a[i].innerHTML == "新建文件夹") {
				count++;
			}
		}
		while (true) {
			if (s == 0) {
				var name = newName;
			} else {
				var name = newName + "(" + s + ")";
			}
			for (var i = 0; i < a.length; i++) {
				if (name == a[i].innerHTML) {
					s++;
					break;
				}
				b = i;
			}
			if (b == a.length - 1) {
				break;
			}

		}
		if (newName == "新建文件夹") {
			if (count == 1) {
				getByClass('fileTitle', domObj)[0].innerHTML = newName;
				getByClass('fileTitle', domObj)[0].title = newName;
			} else {
				getByClass('fileTitle', domObj)[0].innerHTML = newName + '('
						+ s + ')';
				getByClass('fileTitle', domObj)[0].title = newName + '(' + s
						+ ')';
			}
			newName = getByClass('fileTitle', domObj)[0].innerHTML;
		} else {
			if (s == 0) {
				getByClass('fileTitle', domObj)[0].innerHTML = newName;
				getByClass('fileTitle', domObj)[0].title = newName;
			} else {
				getByClass('fileTitle', domObj)[0].innerHTML = newName + '('
						+ s + ')';
				getByClass('fileTitle', domObj)[0].title = newName + '(' + s
						+ ')';
				newName = getByClass('fileTitle', domObj)[0].innerHTML;
			}
		}
		if(names=="create"){
			$.ajax({
				url : "addFolder.action?time="+ new Date().getTime(),
				type : "post",
				async : false,
				contentType : "application/x-www-form-urlencoded",
				data : {
					fname : newName
				}, 
				success : function(data) {
					if (data != null) {
						file = data;
						alert("创建成功");
					} else {
						alert("网络异常创建失败");
					}
				}
			});	
			//给多选框进行赋值
			getByClass('checkstyle', domObj)[0].value = file.fid;
			$('.acreateFile').attr("onclick","fundFileByParentId(\'"+file.fid+"\',true)");	
			$('.icon-download').attr("onclick","downFile(\'"+file.furl+"\',\'"+file.fname+"\',\'"+file.suffix+"\',\'"+file.isdir+"\',\'"+file.fid+"\')");
			
			
			
			var sum = $('.filesCount').text();
		 sum++;
		 $(".filesListCount").find("span").remove();
     	$(".filesListCount").append("<span>已加载</span><span class='filesCount'>"+sum+"</span><span>个</span>");
		}else if(names=="resname"){
			var fid ;
			 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
				 fid = $(this).val();
		     });
			$.ajax({
				url : "renameFolder.action?time="+ new Date().getTime(),
				type : "get",
				async : false,
				contentType : "application/x-www-form-urlencoded",
				data : {
					fname : newName,
					fid:fid
				}, 
				success : function(data) {
					if(data!=null){
						alert("重命名成功")
					}else{
						alert("网络异常失败");
					}
				}
			});
		}
			
		
		
		
		success && success();
		moduleName.style.display = 'none';
	}
	aSpans[1].onclick = function() {
		fail && fail();
		moduleName.style.display = 'none';
	}
}

// 获取当前的所有className
function getByClass(className, parent) {
	parent = parent ? parent : document;
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(className);
	} else {
		var ele = parent.getElementsByTagName('*');
		var arr = [];
		for (var i = 0; i < ele.length; i++) {
			if (tools.hasClass(ele[i].className, className)) {
				arr.push(ele[i]);
			}
		}
		return arr;
	}
}

function addClass(obj, className) {
	obj.className = className;
}

// 选择并重命名
function check() {
	var obj = {
		title : "1"
	};
	this.obj = document.getElementById('filesTab');
	this.child = this.obj.children;
	var ss = document.getElementsByClassName('checkstyle');
	var flag = -1;
	var count = 0;
	for (var i = 0; i < ss.length; i++) {
		if (ss[i].checked) {
			flag = i;
			count++;
		}
	}
	if (count == 1) {
		obj.title = document.getElementsByClassName('fileTitle')[flag].title;
		var name = "resname";
		rename(name,this.child[flag], obj);
	}
}
// 全选和全不选
function ckAll() {
	
	var flag = document.getElementById("allChecks").checked;
	var cks = document.getElementsByClassName('checkstyle');
	for (var i = 0; i < cks.length; i++) {
		cks[i].checked = flag;
	}
}

// 控制全选和部分选后的全选按钮的改变
function allcheck() {
	var cks = document.getElementsByClassName('checkstyle');
	var s = 0;
	for (var i = 0; i < cks.length; i++) {
		if (cks[i].checked == true) {
			s++;
		}
	}
	if (s == cks.length) {
		document.getElementById('allChecks').checked = true;
	} else {
		document.getElementById('allChecks').checked = false;
	}
}


// 展示和隐藏前端的下载和重命名等
function display(type) {
	console.log(type+"-----------type");
	var cks = document.getElementsByClassName('checkstyle');
	var dis = document.getElementById('filesListHeadChangChose');
	var rdis = document.getElementById('headResetName');
	var adis = document.getElementById('filesListHeadChangBtn');
	var s = 0;
	for (var i = 0; i < cks.length; i++) {
		if (cks[i].checked == true) {
			s++;
		}
	}
	if (s >= 1) {
		dis.style.display = "block";
		adis.style.display = 'none'
		if (s >= 2) {
			rdis.style.cursor = ' ';
			rdis.style.color = '#aaaacc';
		} else {
			rdis.style.cursor = 'pointer';
			rdis.style.color = '#3b8cff';
		}
	} else if (s == 0) {
		dis.style.display = 'none';
		adis.style.display = 'block'
	}
}

// 获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1
			+ strDate;
	return currentdate;
}

//下载文件

function downFiles(){
	var fids = [];
	var i = 0;
	 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
		 fids[i] = $(this).val();
		 i++;
         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
     });
	 $.ajax({
			url : "/file/downFiles",
			type : "get",
			async : true,
			contentType : "application/x-www-form-urlencoded",
			data : {
				 fids:fids
			}, 
			success : function(data) {
				if(data=='200')
					alert('下载成功,请在桌面查看');
				else{
					alert('下载失败!!!');
				}
			}
		});	
}

//删除文件
function deletefile(){
	var fids = "";
	var fileName = "";
	var i = 0;
	 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
		 fids += $(this).val() + ",";
		 fileName += $(this).siblings("a").children("span").html() + ",";
         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
         $("table.files").find("tr:eq("+n+")").remove();
    
     });
	 console.log(fids);
	 console.log(fileName);
	 $.ajax({
			url : "deleteFolder.action?time="+ new Date().getTime(),
			type : "get",
			async : false,
			contentType : "application/x-www-form-urlencoded",
			data : {
				fids:fids,
				fileName:fileName
			}, 
			success : function(data) {
				var sum = $('.filesCount').text();
				 sum=sum-i;
				 $(".filesListCount").find("span").remove();
		     	$(".filesListCount").append("<span>已加载</span><span class='filesCount'>"+sum+"</span><span>个</span>");
				document.getElementById('allChecks').checked = false;
				document.getElementById('filesListHeadChangChose').style.display='none';
				document.getElementById('filesListHeadChangBtn').style.display='block';
				alert("删除成功");
			}
		});
	 capacity();
}
//彻底删除
function thoroughDeleteFile(){
	var fids = "";
	var fileName = "";
	var i = 0;
	 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
		 fids += $(this).val() + ",";
		 fileName += $(this).siblings("a").children("span").html() + ",";
         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
         $("table.files").find("tr:eq("+n+")").remove();
    
     });
	 console.log(fids);
	 console.log(fileName);
	 $.ajax({
			url : "thoroughDeleteFile.action?time="+ new Date().getTime(),
			type : "get",
			async : false,
			contentType : "application/x-www-form-urlencoded",
			data : {
				fids:fids,
				fileName:fileName
			}, 
			success : function(data) {
				var sum = $('.filesCount').text();
				 sum=sum-i;
				 $(".filesListCount").find("span").remove();
		     	$(".filesListCount").append("<span>已加载</span><span class='filesCount'>"+sum+"</span><span>个</span>");
				document.getElementById('allChecks').checked = false;
				document.getElementById('filesListHeadChangChose').style.display='none';
				document.getElementById('filesListHeadChangBtn').style.display='block';
				alert("彻底删除成功");
			}
		});
	 capacity();
}



//回收站恢复文件
function restore(){
	var fids = "";
	var fileName = "";
	var i = 0;
	 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
		 fids += $(this).val() + ",";
		 fileName += $(this).siblings("a").children("span").html() + ",";
         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
         $("table.files").find("tr:eq("+n+")").remove();
     });
	 console.log(fids);
	 console.log(fileName);
	 $.ajax({
			url : "restore.action?time="+ new Date().getTime(),
			type : "get",
			async : false,
			contentType : "application/x-www-form-urlencoded",
			data : {
				fids:fids,
				fileName:fileName
			}, 
			success : function(data) {
				var sum = $('.filesCount').text();
				 sum=sum-i;
				 $(".filesListCount").find("span").remove();
		     	$(".filesListCount").append("<span>已加载</span><span class='filesCount'>"+sum+"</span><span>个</span>");
				document.getElementById('allChecks').checked = false;
				document.getElementById('filesListHeadChangChose').style.display='none';
				document.getElementById('filesListHeadChangBtn').style.display='block';
				alert("恢复成功");
			}
		});
	 capacity();
}




//选择复制还是移动
function isCopyOrMove(names){
	var str ="";
	str+="<span class='dialog-header-title'><em class='select-text' >"+names+"</em></span>";
	document.getElementById('aa').innerHTML = str;
	document.getElementById('module-canvas').style.display='block';
	document.getElementById('fileTreeDialog').style.display='block';
	namecm = names;
	
}





function get(obj){
	sures = obj.attributes['data-file-id'].nodeValue;
}

//取消
function cancel(){
	document.getElementById('module-canvas').style.display='none';
	document.getElementById('fileTreeDialog').style.display='none';
}
function sure(){
	if(namecm=='复制到'){
		var fids = [];
		var i = 0;
		 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
			 fids[i] = $(this).val();
			 i++;
	         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
	     });
		 $.ajax({
				url : "/file/copyFiles",
				type : "get",
				async : false,
				contentType : "application/x-www-form-urlencoded",
				data : {
					pid:sures,
					 fids:fids
				}, 
				success : function(data) {
					if(data==true){
						alert("复制成功");
						document.getElementById('module-canvas').style.display='none';
						document.getElementById('fileTreeDialog').style.display='none';
					}else{
						alert("该目录下存在同名文件了");
					}
					
				}
			});
		 capacity();
	}else{
		var fids = [];
		var i = 0;
		 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
			 fids[i] = $(this).val();
			 i++;
	         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
	     });
		 $.ajax({
				url : "/file/moveFiles",
				type : "get",
				async : false,
				contentType : "application/x-www-form-urlencoded",
				data : {
					pid:sures,
					 fids:fids
				}, 
				success : function(data) {
					if(data){
						alert("移动成功");
						document.getElementById('module-canvas').style.display='none';
						document.getElementById('fileTreeDialog').style.display='none';
						document.getElementById('allChecks').checked = false;
						document.getElementById('filesListHeadChangChose').style.display='none';
						document.getElementById('filesListHeadChangBtn').style.display='block';
						 $("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
					         n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
					         $("table.files").find("tr:eq("+n+")").remove();
					     });
						 
						 
						 var sum = $('.filesCount').text();
						 sum=sum-i;
						 $(".filesListCount").find("span").remove();
				     	$(".filesListCount").append("<span>已加载</span><span class='filesCount'>"+sum+"</span><span>个</span>");	 
						 
						 
					}else{
						alert("该目录下存在同名文件了");
					}
				}
			});
		
	}
}


//移动位置
function moveLocation(obj){
	
	$(obj).mousedown(function(e){
	    //设置移动后的默认位置
	    var endx=0;
	    var endy=0;
	    //获取div的初始位置，要注意的是需要转整型，因为获取到值带px
	    var left= parseInt($(obj).css("left"));
	    var top = parseInt($(obj).css("top"));

	    //获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY
	    var downx=e.pageX;
	    var downy=e.pageY;     //pageY的y要大写，必须大写！！

	 //    鼠标按下时给div挂事件
	$(obj).bind("mousemove",function(es){

	    //es.pageX,es.pageY:获取鼠标移动后的坐标
	    var endx= es.pageX-downx+left;     //计算div的最终位置
	    var endy=es.pageY-downy+top;

	    //带上单位
	    $(obj).css("left",endx+"px").css("top",endy+"px")    
	});    
	})


	$(obj).mouseup(function(){
	    //鼠标弹起时给div取消事件
	    $(obj).unbind("mousemove")
	})

}

//分享
function shareFile() {
	var str ="";
	str+="<span class='dialog-header-title'><em class='select-text' >创建分享</em></span>";
	$('#bb').html(str);
	var str1 = '';
	str1 += '<a class="g-button g-button-large" title="取消分享" style="float: right; padding-left: 50px;"><span class="g-button-right" style="padding-right: 50px;"><span class="text" style="width: auto;" onclick="cancelShare()">取消分享</span></span></a><a class="g-button g-button-blue-large" title="创建分享" style="float: right; padding-left: 50px;" onclick="createShare()"><span class="g-button-right" style="padding-right: 50px;"><span class="text" style="width: auto;">创建分享</span></span></a>';
	$("#shareSelect").html(str1);
	var str2 = '';
	var str3 = '';
	//str2 += '<div class="context">创建分享后，可以让任何人查看或下载，是否确认创建分享？</div>';
	str2 += '<span style="color:#8b909e; font-size:14px;vertical-align:top; height: 50px;padding: 15px 20px 0">分享形式</span>   <input type="radio"  value="1" name="Tcode"  checked="checked"/><span style=" font-size:14.5px;vertical-align:top; height: 50px;padding: 15px 10px 0">有提取码</span><input type="radio"  value="0" name="Tcode"/><span style=" font-size:14.5px;vertical-align:top; height: 50px;padding: 15px 10px 0">公开分享</span><br/><br/>';
	str3 += '<span style="color:#8b909e; font-size:14px;vertical-align:top; height: 50px;padding: 15px 23px 0">有效期</span> <select id="day"><option value="-1">永久有效</option><option value="7" selected="selected">7天</option><option value="1">1天</option></select><br/><br/>'
	$("#shareContext").html(str2+str3);
	//$("#shareContext").html(str3);
	$("#module-share").css("display", "block");
	$("#shareDialog").css("display", "block");
}

// 取消分享
function cancelShare() {
	$("#module-share").css("display", "none");
	$("#shareDialog").css("display", "none");
}

// 创建分享
function createShare() {
	// 获取到选中文件的id，然后使用AJAX异步创建分享，显示文件访问链接
	var fids = '';
	var fileName = "";
	var i = 0;
	$("input[class='checkstyle']:checked").each(function() { // 遍历选中的checkbox
		if( i != 0 ) fids += ',';
		fileName += $(this).siblings("a").children("span").html() + ",";
		fids += $(this).val();
		i++;
        n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
    });
	var tcode = $("input[name='Tcode']:checked").val();
	var day = $("#day").val();
	console.log(day + "======");
	console.log(tcode + "~~~~");
	$.ajax({
		url:"/netdisc/share/shareFolder.action?time="+ new Date().getTime(),
		type:'POST',
		async : false,
		contentType : "application/x-www-form-urlencoded",
		data: {'fids': fids,
			    fileName:fileName,
			    tcode:tcode,
			    day:day
		},
		success: function(data) {
			//data = JSON.parse(data);
			if( data.code== 1 ) {// 分享成功
				var url = data.url;
				var htcode=data.tcode;
				var str = '';
				str += '<div class="success-context"><div class="url-info">';
				str += '<span class="share-success"><em class="icon"></em>成功创建分享链接 </span>';
				str += '<div class="url-context"><div class="copy-button-section" onclick="copyurl()">';
				str += '<a class="g-button g-button-blue copy-button" id="copyShare">';
				str += '<span class="g-button-right"><span class="text public" id="cc">复制链接</span>';
				str += '</span></a><div class="copy-tips" id="copy-tips" style="display: none;">复制链接成功</div>';
				str += '</div><div class="url"><div class="share-url-border">';
				str += '<input type="text" spellingcheck="false" readonly="readonly" id="surl" class="share-url" value="'+url+'"/><br/>';
				str += '</div></div></div></div></div>';
				if(tcode==1)str+='提取码<input type="text" value="'+htcode+'"/>';
				$("#shareContext").html(str);
				var str1 = '';
				str1 += '<a class="g-button g-button-large" title="关闭" style="float: right; padding-left: 50px;"><span class="g-button-right" style="padding-right: 50px;"><span class="text" style="width: auto;" onclick="cancelShare()">关闭</span></span></a>'
				$("#shareSelect").html(str1);
			} else { // 分享失败
				console.log("分享出错");
			}
		},
		error: function() {
			alert("分享失败");
		}
	});
}

function copyurl() {
	var obj = document.getElementById('cc');
	var url = $("#surl").val();
	var clipboard = new ClipboardJS(obj, {
        text: function() {
            return url;
        }
    });
    clipboard.on('success', function(e) {//复制成功执行的回调，可选
        $("#copy-tips").css("display", "block");
        clipboard.destroy();
    });
    clipboard.on('error', function(e) {//复制失败执行的回调，可选
    	alert("复制失败了T_T");
    	if(clipboard) {
            clipboard.destroy();
        }
    });
}
