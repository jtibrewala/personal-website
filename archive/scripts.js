//Print the timestamp of the file - used at the bottom of most pages
function printTimeStamp()
{
	var theDate = "";
	theDate = document.lastModified;
	document.write("<center><FONT size=-2><I> &copy; 1995-2015 Last Updated : " + theDate + 
               " by Jaideep Tibrewala.\n </I></FONT></center>");
}


