$(document).ready(meerkat_init);

var meerkatCnt;
var meerkats;

var successCnt = 0;
var plstCnt = 0;
var sh_speed = 700;

function updateInfo()
{
	$("#bg").html(successCnt+"_"+plstCnt);
}

function meerkat_init()
{
	meerkats = document.getElementsByClassName("meerkat");
	meerkatCnt = meerkats.length;
	
	kennels = document.getElementsByClassName("kennel");
	kennelCnt = kennels.length;
	
	$(".meerkat").click(function() {
		meerkat_break(this);
	});
	
	meerkat_start();
}

function meerkat_click(mk)
{
	if(!$(mk).hasClass("in_hide"))
		meerkat_hide_mk(mk, "user");
}

function meerkat_kennel_have_mk(kn)
{
	return $(kn).find(".meerkat").size();
}

function meerkat_create_dom()
{
	meerkat = document.createElement("div");
	meerkat.className = "meerkat";
		meerkatImg = document.createElement("img");
		meerkatImg.src = "resources/meerkat-normal.svg";
		meerkat.appendChild(meerkatImg);
	
	$(meerkat).click(function() {
		meerkat_click(this);
	});
	
	return meerkat;
}

function meerkat_hide_mk(mk, hand)
{
	$(mk).addClass("in_hide");
	$(mk).animate({height: 0}, sh_speed);
	setTimeout(function() {
		if(hand == "auto" && mk.parentNode != null)
		{
			plstCnt++;
		}
		else if(hand == "user")
		{
			successCnt++;
		}
		$(mk).remove();
		updateInfo();
	}, sh_speed);
}

function meerkat_show_mk(mk)
{
	$(mk).animate({height: 212}, sh_speed);
}

function meerkat_break_mk(mk, hand)
{
	setTimeout(function() {
		meerkat_hide_mk(mk, hand);
	}, 1500);
}

function meerkat_get_random_show()
{
	randPos = parseInt(Math.random() * (kennelCnt - 0) + 0);
	
	new_mk = meerkat_create_dom();
	kn = kennels[randPos];
	
	if(!meerkat_kennel_have_mk(kn))
	{
		kennels[randPos].appendChild(new_mk);
		meerkat_show_mk(new_mk);
		meerkat_break_mk(new_mk, "auto");
	}
}

function meerkat_start()
{
	setInterval(meerkat_get_random_show, 2000);
}

