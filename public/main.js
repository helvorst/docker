const skipSong = btn => {
    const id = btn.dataset.id;
    fetch('/play', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(response => {
            window.location.reload(true);
        })
};

const deleteSong = (btn) => {
    const id = btn.dataset.id;

    fetch("/play", {
        method: "delete",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
            id,
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {
            window.location.reload();
        });
}