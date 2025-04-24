document.getElementById('raiderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const region = document.getElementById('guildRegion').value;
    const realm = document.getElementById('guildRealm').value;
    const guildName = document.getElementById('guildName').value;

    // Add a loading indicator
    const output = document.getElementById('output');
    output.innerHTML = '<p>Loading guild data...</p>';

    try {
        const response = await fetch(`https://raider.io/api/v1/guilds/profile?region=${region}&realm=${realm}&name=${guildName}&fields=members`);
        
        // Handle non-200 responses
        if (!response.ok) {
            throw new Error('Guild not found or invalid details provided');
        }

        const data = await response.json();
        output.innerHTML = ''; // Clear loading indicator
        displayGuildData(data);
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

const displayGuildData = (data) => {
    const roster = data.members;
    const tableBody = document.getElementById('guildTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous data

    roster.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.character.name}</td>
            <td>${member.character.role || 'N/A'}</td>
            <td>${member.character.achievementPoints || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
};
