$(function () {
    // Initialize tabs
    $("#tabs").tabs();
});

function copyText(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}

const platitudes = []

function fetchTextFromFile(filename) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filename, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const sections = xhr.responseText.split("********************");

            // Create an object to hold tab data
            const tabsData = {};

            sections.forEach((section) => {
                const parts = section.split("//");
                if (parts.length === 2) {
                    const tabInfo = parts[0].trim().split("/");
                    const tabTitle = tabInfo[0].trim(); // Tab title
                    const contentTitle = tabInfo[1] ? tabInfo[1].trim() : ""; // Content title
                    const content = parts[1].trim();

                    // If the tab doesn't exist in the object, create it
                    if (!tabsData[tabTitle]) {
                        tabsData[tabTitle] = [];
                    }

                    // Push the content title and content into the tab's array
                    const platitude = { title: contentTitle, content: content };
                    platitudes.push(platitude);
                    tabsData[tabTitle].push(platitude);
                }
            });

            // Dynamically generate tabs and accordions
            Object.keys(tabsData).forEach((tabTitle, index) => {
                const tabId = `tabs-${index + 1}`;
                $('#panels').append(`<li><a href="#${tabId}">${tabTitle}</a></li>`);
                $('#tabs').append(`<section id="${tabId}"><div id="accordion-${index + 1}"></div></section>`);

                tabsData[tabTitle].forEach((item, itemIndex) => {
                    const header = $('<h2></h2>').text(item.title); // This is the content title in the accordion
                    const paragraph = $('<div></div>').append(
                        $('<p></p>').text(item.content).attr('id', `copypasta-${index + 1}-${itemIndex}`),
                        $('<div class="copy-button-container"></div>').append(
                            $('<button>Nhấn để copy</button>').click(() => copyText(`copypasta-${index + 1}-${itemIndex}`))
                        )
                    );

                    // Append header and content to the accordion
                    $(`#accordion-${index + 1}`).append(header).append(paragraph);
                });

                // Initialize accordion for this section
                $(`#accordion-${index + 1}`).accordion({
                    active: false,
                    collapsible: true,
                    heightStyle: 'content',
                });
            });

            // Add search tab
            addSearchTab();

            // Add an age calculator tab
            addAgeCalculatorTab();

            // Add a contribution tab
            addContributionTab();

            // Refresh the tabs to apply changes
            $("#tabs").tabs("refresh");

            // Activate the first tab
            $("#tabs").tabs("option", "active", 0);
        } else {
            console.error("Error fetching text file:", xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error("Error fetching text file:", xhr.statusText);
    };

    xhr.send();
}

function addSearchTab() {
    const tabTitle = 'Tìm văn mẫu';
    const tabIndex = $('#panels li').length + 1;
    const tabId = `tabs-${tabIndex}`;
    $('#panels').append(`<li><a href="#${tabId}">${tabTitle}</a></li>`);
    $('#tabs').append(`<section id="${tabId}"></section>`);

    // Add specified HTML content directly to the new tab
    const htmlContent = `
        <div class="centered">
            <input type="text" placeholder="Nhập từ khóa" onkeyup="onSearch(${tabIndex}, this.value.trim());">
            <hr>
        </div>
    `;

    $(`#${tabId}`).append(htmlContent);
}

function addAgeCalculatorTab() {
    const tabTitle = "Máy tính tuổi thông minh";
    const index = $("#panels li").length + 1; // Get the next index for the new tab
    const tabId = `tabs-${index}`;
    $('#panels').append(`<li><a href="#${tabId}">${tabTitle}</a></li>`);
    $('#tabs').append(`<section id="${tabId}"></section>`);

    // Add specified HTML content directly to the new tab
    const htmlContent = `
        <div class="centered">
            <h2 id="mtttm">Máy tính tuổi thông minh</h2>
            <p>Nhập tuổi của bạn</p>
            <input type="text" onfocus="this.value=''" onChange="mod();" id="age_e">
            <p id="age_a"></p>
            <button id="nut_adawdawdawdawdawd" onclick="age()">Tính tuổi của bạn</button>
        </div>
    `;

    $(`#${tabId}`).append(htmlContent);
}

function addContributionTab() {
    const tabTitle = "Đóng góp văn mẫu cho web";
    const index = $("#panels li").length + 1; // Get the next index for the new tab
    const tabId = `tabs-${index}`;
    $('#panels').append(`<li><a href="#${tabId}">${tabTitle}</a></li>`);
    $('#tabs').append(`<section id="${tabId}"></section>`);

    // Add specified HTML content directly to the new tab
    const htmlContent = `
        <h3 id="hhnhm" style="text-align:center;">
            Rất chào bạn.<br>
            Bạn có thể gửi những bài văn mẫu hoặc những lời hay ý đẹp mà bạn tin rằng nên được lưu lại cùng với thời gian tại đây.<br>
            Chúng tôi (hoặc 1 thằng) sẽ rất vui lòng thêm nó vào web nếu như đoạn văn mẫu đấy chưa có sẵn trên này.
        </h3>
        <div class="google_form" style="text-align:center;">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeP6YvXHLXef5SWfc1RKsXd3AWG4e005j8OnYGr6VyM9VwXlQ/viewform?embedded=true" width="640" height="954" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>        
            </div>
    `;

    $(`#${tabId}`).append(htmlContent);
}

// Call the function to fetch text from the file
fetchTextFromFile('https://raw.githubusercontent.com/comgachienmam147/comgachienmam147.github.io/refs/heads/master/copypasta.txt');

var inc = 0, inb = 0; 
function mod() { inb = inc = 0; } 
function age() { 
    var n = document.getElementById("age_e").value, 
        e = n + " là tuổi clgt???"; 
    if (0 == document.getElementById("age_e").value.length || isNaN(n)) 
        if (0 == document.getElementById("age_e").value.length) 
            document.getElementById("age_a").innerHTML = "Chưa nhập gì hết."; 
        else { 
            switch (inc) { 
                case 0: document.getElementById("age_a").innerHTML = e; break; 
                case 1: document.getElementById("age_a").innerHTML = "Đây là lần thứ 2 rồi nhưng bạn vẫn nhập sai."; break; 
                case 2: document.getElementById("age_a").innerHTML = "Thật ra bạn chỉ bấm cái nút này cho vui thôi phải không?" 
            }
            inc++; 
        } 
    else 
        0 == inb ? (document.getElementById("age_a").innerHTML = "Bạn đã " + n + " tuổi rồi.", inc = 0) : document.getElementById("age_a").innerHTML = "Bạn đã nhấn cái nút này " + inb + " lần, tuổi của bạn vẫn là " + n, inb++; 
    if (3 < inc) 
        for (var t = 0; t <= inc; t++) document.getElementById("age_a").innerHTML = " đừng có nhấn nữa".repeat(t); 
    6 == inc && (document.getElementById("age_a").innerHTML = "nhấn thêm lần nữa xem?"), 
    7 == inc && (document.getElementById("age_a").innerHTML = "chắc chưa?", document.getElementById("nut_adawdawdawdawdawd").innerHTML = "chắc."), 
    7 < inc && (window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

function onSearch(index, searchText) {
    if (!searchText.length) {
        return;
    }
    const $tab = $(`#tabs-${index}`);
    $tab.children().slice(1).remove();
    const filteredPlatitudes = platitudes.filter(van => van.title.toLowerCase().includes(searchText.toLowerCase())
        || van.content.toLowerCase().includes(searchText.toLowerCase()));
    const $accordion = $('<div>', {id: `accordion-${index}`, class: 'accordion'});
    $tab.append($accordion);
    const regex = new RegExp(`(${searchText})`, 'gi');
    filteredPlatitudes.forEach((item, itemIndex) => {
        const $header = $('<h2>').html(item.title.replaceAll(regex, '<mark>$1</mark>'));
        const $paragraph = $('<div>').append(
            $('<p>', {id: `copypasta-${index}-${itemIndex + 1}`}).html(item.content.replaceAll(regex, '<mark>$1</mark>')),
            $('<div>', {class: 'copy-button-container'}).append(
                $('<button>', {text: 'Nhấn để copy'}).click(() => copyText(`copypasta-${index}-${itemIndex + 1}`))
            )
        );
        $accordion.append($header, $paragraph);
    });
    $accordion.accordion({
        active: false,
        collapsible: true,
        heightStyle: 'content',
    });
}
