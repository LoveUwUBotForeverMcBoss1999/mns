async function fetchTopVoters() {
    const spinner = document.getElementById('loading-spinner');
    const tableBody = document.getElementById('voters-table-body');
    
    // API Configuration
    const API_BASE = 'https://votes.mnsnetwork.xyz/api/votes/'; // Change this to your actual API URL
    
    console.log('Starting to fetch voters data...');
    spinner.style.display = 'flex';
    tableBody.innerHTML = '';

    try {
        // Test API connection first
        console.log('Testing API connection...');
        try {
            const testResponse = await fetch(API_BASE + '1');
            console.log('API Test Response:', testResponse);
            
            if (!testResponse.ok) {
                const errorText = await testResponse.text();
                console.error('API test failed:', errorText);
                throw new Error(`API test failed: ${testResponse.status} ${errorText}`);
            }
        } catch (testError) {
            console.error('API connection test failed:', testError);
            throw new Error('Could not connect to API. Please check if the API server is running.');
        }

        // Fetch data for top 10 voters
        console.log('Fetching top 10 voters...');
        const voterPromises = Array.from({ length: 10 }, (_, i) => {
            const url = `${API_BASE}${i + 1}`;
            console.log(`Fetching voter ${i + 1} from ${url}`);
            
            return fetch(url)
                .then(async response => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error(`Error fetching voter ${i + 1}:`, errorText);
                        throw new Error(`API request failed: ${response.status} ${errorText}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Error processing voter ${i + 1}:`, error);
                    return null;
                });
        });

        const voters = await Promise.all(voterPromises);
        console.log('Received voters data:', voters);
        
        spinner.style.display = 'none';

        // If no valid voter data was received, show error
        if (!voters.some(Boolean)) {
            console.error('No valid voter data received');
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #ff4444;">
                        Unable to load voter data. Please check the console for detailed error messages.
                        <br>
                        <small>Make sure the API server is running and accessible at ${API_BASE}</small>
                    </td>
                </tr>`;
            return;
        }

        // Filter out any failed requests and create table rows
        voters.filter(Boolean).forEach((voter, index) => {
            console.log(`Processing voter ${index + 1}:`, voter);
            
            const row = document.createElement('tr');
            const rankClass = index < 3 ? `rank-${index + 1}` : '';
            
            const lastVoted = new Date(voter.lastVoted);
            const formattedDate = lastVoted.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            row.innerHTML = `
                <td>
                    <span class="rank-badge ${rankClass}">${voter.rank}</span>
                </td>
                <td>${voter.username}</td>
                <td>${voter.votes}</td>
                <td>${formattedDate}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fatal error fetching voter data:', error);
        spinner.style.display = 'none';
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #ff4444;">
                    Unable to load voter data. Please check the console for detailed error messages.
                    <br>
                    <small>Technical details: ${error.message}</small>
                </td>
            </tr>`;
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, fetching voters...');
    fetchTopVoters();
});

// Refresh every 5 minutes
setInterval(fetchTopVoters, 300000);
