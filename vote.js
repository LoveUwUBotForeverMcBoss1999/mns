async function fetchTopVoters() {
    const spinner = document.getElementById('loading-spinner');
    const tableBody = document.getElementById('voters-table-body');
    
    spinner.style.display = 'flex';
    tableBody.innerHTML = '';

    const API_BASE = 'https://votes.mnsnetwork.xyz/api/votes/';
    
    try {
        // Log the requests we're about to make
        console.log('Starting to fetch voter data from:', API_BASE);
        
        // Fetch data for top 10 voters one at a time
        const voters = [];
        for (let i = 1; i <= 10; i++) {
            try {
                const response = await fetch(API_BASE + i);
                console.log(`Response for voter ${i}:`, response);
                
                if (!response.ok) {
                    const text = await response.text();
                    console.error(`Error fetching voter ${i}:`, text);
                    continue;
                }
                
                const data = await response.json();
                console.log(`Data for voter ${i}:`, data);
                voters.push(data);
            } catch (error) {
                console.error(`Error processing voter ${i}:`, error);
            }
        }
        
        spinner.style.display = 'none';

        // If no valid voter data was received, show error
        if (voters.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #ff4444;">
                        No voter data available. Please try again later.
                    </td>
                </tr>`;
            return;
        }

        // Create table rows for each voter
        voters.forEach((voter, index) => {
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
        console.error('Error fetching voter data:', error);
        spinner.style.display = 'none';
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #ff4444;">
                    Error loading voter data. Please check console for details.
                    <br>
                    <small>Error: ${error.message}</small>
                </td>
            </tr>`;
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchTopVoters);

// Refresh every 5 minutes
setInterval(fetchTopVoters, 300000);
