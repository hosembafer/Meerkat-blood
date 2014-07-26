$(document).ready(meerkat_init);

var meerkatCnt;
var meerkats;

var successCnt = 0;
var plstCnt = 0;

var indHides = {};

function updateInfo()
{
	$(".info").html(successCnt+"_"+plstCnt);
}

function meerkat_init()
{
	meerkatCnt = $(".meerkat").size();
	meerkats = $(".meerkat");
	
	$(".meerkat").click(function() {
		meerkat_break(this);
	});
	
	//meerkat_get_random_show();
}

function meerkat_break(meerkat)
{
	$(meerkat).animate({"height": 0}, 300);
	setTimeout(function() {
		successCnt++;
		updateInfo();
	}, 300);
}

function meerkat_show(ind)
{
	$(meerkats).eq(ind).animate({"height": 212}, 300);
}

function meerkat_is_hide(ind)
{
	if($(meerkats).eq(ind).height() != 0)
		return false;
	return true;
}

function meerkat_timeout_hide(ind)
{
	tmt = setTimeout(function() {
		if(!meerkat_is_hide(ind))
		{
			$(meerkats).eq(ind).animate({"height": 0}, 300);
			setTimeout(function() {
				if(!meerkat_is_hide(ind))
				{
					plstCnt++;
					updateInfo();
				}
			}, 300);
		}
	}, 2500);
	
	indHides[ind] = tmt;
}


function meerkat_get_random_show()
{
	setInterval(function() {
		randMK = parseInt(Math.random() * (meerkatCnt - 0) + 0);
		if(meerkat_is_hide(randMK))
		{
			meerkat_show(randMK);
			meerkat_timeout_hide(randMK);
		}
	}, 700);
	
}