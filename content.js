const nyaa_url = 'https://nyaa.si/?f=0&c=0_0&q=';
const rarbg_url = 'https://rarbggo.org/torrents.php?search=';

getBtn = (title, season_info, PROVIDER) => {
	let url = '';
	switch (PROVIDER) {
		case 'NYAA':
            url = nyaa_url;
			break;
		case 'RARBG':
            url = rarbg_url;
			break;
		default:
			break;
    }
    url += `${title} ${season_info}`
	return `<a title="Find episode on ${PROVIDER}" target="_blank" class="btn-reset btn-dl" style="margin: 0px 4px;" 
    href="${url}">${PROVIDER}</a>
    `;
}
getBtnsContainer = (title, season_info) => {
	return `
    <div class="search-btn" style="display: flex;align-self: center;justify-content: flex-end;">
    ${getBtn(title, season_info, 'NYAA')}
    ${getBtn(title, season_info, 'RARBG')}    
    </div>
    `;
};

insertEpisodesButtons = () => {
	const episodes = document.querySelectorAll('*[id^="ep_"]');
	for (const ep of episodes) {
		const ep_info = Array.from(ep.querySelectorAll('.episode-titre a'));
		const ep_title = ep_info[0].innerHTML;
		const ep_season_info = ep_info[1].innerHTML;
		ep.innerHTML += getBtnsContainer(ep_title,ep_season_info)
	}
	// console.log(episodes);
};

insertSeriesButtons = () => {
	const series_headers = document.querySelectorAll('.episodes > h2');
	for (const header of series_headers) {
        const sereis_title = header.getElementsByTagName('a')[0].innerHTML;
		header.innerHTML += getBtnsContainer(sereis_title,'')
	}
};


const styles = document.createElement('style');  
styles.innerHTML =  `
    .episodes > h2 {
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
`;
document.body.insertBefore(styles ,  document.body.childNodes[0])
setTimeout(() => {
    insertEpisodesButtons();
    insertSeriesButtons()
}, 5000);
