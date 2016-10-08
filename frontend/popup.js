$(document).ready(function () {
  'use strict';

  function createSearchUrl() {
    var url, subreddit;
    url = 'https://www.google.com/search?q=site:www.reddit.com/';
    subreddit = $('#subreddit').val();

    if (subreddit) {
      url += 'r/' + subreddit;
    }
    url += '+' + $('#search_query').val();
    return url;
  }

  function search(tabOption) {
    var url = createSearchUrl();
    if (tabOption === 'cur_tab') {
      chrome.tabs.update({url: url});
      window.close();
    } else {
      chrome.tabs.create({url: url});
    }
  }

  function addSubToStorage() {
    chrome.storage.local.get('subs', function updateStorage(result) {
      var subs = result.subs;
      subs.push($('#subreddit').val());
      chrome.storage.local.set({'subs': subs});
    });
  }

  $('button').click(function () {
    if ($('#search_query').val()) {
      /* if there was no suggestion for the subreddit, add it to the storage */
      if ($('#sub_feed option').length === 0 && $('#subreddit').val()) {
        addSubToStorage();
      }
      var tabOption = $(this).val();
      search(tabOption);
    } else {
      /* otherwise show warnings */
      $('#query_group').addClass('has-error');
      $('#help1').removeClass('vishid');
      return false;
    }
  });
});
