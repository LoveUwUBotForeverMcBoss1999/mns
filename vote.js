async function fetchTopVoters() {
    const spinner = document.getElementById('loading-spinner');
    const tableBody = document.getElementById('voters-table-body');
    
    spinner.style.display = 'flex';
    tableBody.innerHTML = '';

    try {
        // Fetch data for top 10 voters
        const voterPromises = Array.from({ length: 10 }, (_, i) => 
            fetch(`https://votes.mnsnetwork.xyz/api/votes/${i + 1}`)
                .then(response => {
                    if (!response.ok) throw new Error('API request failed');
                    return response.json();
                })
                .catch(() => null)
        );

        const voters = await Promise.all(voterPromises);
        
        spinner.style.display = 'none';

        // If no valid voter data was received, show error
        if (!voters.some(Boolean)) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #ff4444;">
                        Unable to load voter data due to CORS restrictions. 
                        Please ensure the API server allows requests from this domain.
                    </td>
                </tr>`;
            return;
        }

        // Filter out any failed requests and create table rows
        voters.filter(Boolean).forEach((voter, index) => {
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
                    Unable to load voter data. CORS policy is blocking access to the API.
                    <br>
                    <small>Technical details: ${error.message}</small>
                </td>
            </tr>`;
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchTopVoters);

// Refresh every 5 minutes
setInterval(fetchTopVoters, 300000);