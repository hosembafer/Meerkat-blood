$(document).ready(meerkat_init);

var meerkatCnt;
var meerkats;

var successCnt = 0;
var plstCnt = 0;
var sh_speed = 700;
var sh_inerval = [3000, 1000];

var inst_sounds = {
	hummer: {
		src: "resources/sound/hummer.mp3",
		seconds: 5000
	}
};

var effects = {};
	effects.show = "easeOutElastic";
	effects.hide = "easeInOutElastic";

function meerkat_get_rand_show_speed()
{
	return parseInt(Math.random() * (sh_inerval[0] - sh_inerval[1]) + sh_inerval[1]);
}

function updateInfo()
{
	$("#bg__info").html(successCnt+"_"+plstCnt);
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
	{
		$(mk).find("img").attr("src", "resources/breaks/hummer/1.svg");
		meerkat_hide_mk(mk, "user");
		meerkat_add_sound("hummer");
	}
}

function meerkat_attach_sound_remove_timeout(it, sec)
{
	setTimeout(function() {
		$(it).remove();
	}, sec);
}

function meerkat_add_sound(inst)
{
	elem = document.createElement("audio");
	elem.src = inst_sounds[inst].src;
	elem.autoplay = true;
	document.body.appendChild(elem);
	
	meerkat_attach_sound_remove_timeout(elem, inst_sounds[inst].seconds);
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
	
	meerkat.onmousedown = function() {return false};
	
	$(meerkat).mousedown(function() {
		meerkat_click(this);
	});
	
	return meerkat;
}

function meerkat_hide_mk(mk, hand)
{
	$(mk).addClass("in_hide");
	$(mk).animate({height: 0}, sh_speed, effects.hide);
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
	$(mk).animate({height: 212}, sh_speed, effects.show);
}

function meerkat_break_mk(mk, hand)
{
	setTimeout(function() {
		meerkat_hide_mk(mk, hand);
	}, 1200);
}

function meerkat_get_random_show()
{
	setTimeout(function() {
		randPos = parseInt(Math.random() * (kennelCnt - 0) + 0);
		
		new_mk = meerkat_create_dom();
		kn = kennels[randPos];
		
		if(!meerkat_kennel_have_mk(kn))
		{
			kennels[randPos].appendChild(new_mk);
			meerkat_show_mk(new_mk);
			meerkat_break_mk(new_mk, "auto");
		}
	}, meerkat_get_rand_show_speed());
}

function meerkat_start()
{
	meerkat_get_random_show();
	setInterval(meerkat_get_random_show, 1000);
}

