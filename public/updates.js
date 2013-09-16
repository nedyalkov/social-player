var API_KEY = 'AIzaSyAAD_lGgYjGTiEIDebQJ7dIdp8laDqT_G4';

var getHtmlForEnqueueItem = function(item, requestedBy) {
	var template = kendo.template($("#enqueueItemTemplate").html());
	return template({
				title: item.snippet.title,
				imageUrl: item.snippet.thumbnails.default.url,
				requestedBy: requestedBy,
			});
};

var getInfoUrl = function(videoIds) {
	var videoIdsString = videoIds.join('%2');
	return 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoIdsString + '&key=' + API_KEY
}

var findItem = function(list, predicate) {
	var result = false;
	list.forEach(function(i) {
		if (predicate(i)) {
			result = true;
		}
	});
	return result;
};

var getNewItems = function(oldList, newList) {
	var result = [];
	newList.forEach(function(item) {
		if (!findItem(oldList, function(i) { return i.id == item.id; })) {
			result.push(item);
		}					
	});
	return result;
};

var displayMessage = function(message) {
	var m = $("#messagePlaceholder");
	m.html(message);
	m.fadeIn(500);
	m.delay(1500).fadeOut(700);
};

var notifyItemsAdded = function(newItems) {
	// NOTE: This ignores multiple items.
	var newItem = newItems[0];
	
	var requestedBy = newItem.requestedBy;	
	$.getJSON(getInfoUrl([newItem.id]), function(data) {		
		resultItem = data.items[0];
		displayMessage(getHtmlForEnqueueItem(resultItem, requestedBy));
	});
};

var updateList = function() {
	$.getJSON('playlist', function(data) {
		var newItems = getNewItems(allVideosList, data);
		if (newItems.length > 0) {					
			notifyItemsAdded(newItems);
		}
		allVideosList = data;
		resumePlayback();
	});
}