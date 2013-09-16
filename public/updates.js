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
	m.delay(1500).fadeOut(500);
};

var notifyItemsAdded = function(newItems) {
	newItems.forEach(function(item) {
		displayMessage(item.id + " " + item.requestedBy + " added");
	});
};

var tooltip;

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