const API_KEY = "e6b21abab573401c97a0fc01e9343103";

type Game = {
    id: number;
    name: string;
    released: string;
    rating: number;
    background_image: string;
    platforms: {
        platform: {
            name: string;
        }
    }[];
};

type FetchResult = {
    games: Game[];
    error: string | null;
}

async function getFightingGames(): Promise<FetchResult> {
    if (API_KEY !== "e6b21abab573401c97a0fc01e9343103" || !API_KEY) {
        return { games: [], error: "API Key not set. Please add your key to line 5 in /app/explore/page.tsx" };
    }

    const URL = `https://api.rawg.io/api/games?key=${API_KEY}&genres=fighting`;

    try {
        const response = await fetch(URL, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'NextJS-Quiz-App'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized. Check your API key. Is it correct?');
            }
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.results) {
            return { games: data.results, error: null };
        } else {
            throw new Error("Invalid API response format");
        }

    } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Detailed fetch error:", errorMessage);

        return { games: [], error: errorMessage };
    }
}

export default async function ExplorePage() {
    const { games, error } = await getFightingGames();

    return (
        <main className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-5">Fighting Games</h1>
                <p className="lead">Top-rated fighting games</p>
                <p className="text-muted">Data fetched from external API (RAWG.io)</p>
            </div>

            {error && (
                <div className="alert alert-danger">
                    <h5>Could not load data</h5>
                    <p className="m-0">{error}</p>
                </div>
            )}

            {!error && games.length === 0 && (
                <div className="text-center">
                    <p>No games found.</p>
                </div>
            )}

            {!error && games.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Platforms</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.id}>
                                    <td>
                                        <img
                                            src={game.background_image}
                                            alt={game.name}
                                            style={{ height: '60px', width: '100px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </td>
                                    <th scope="row">{game.name}</th>
                                    <td>{game.released}</td>
                                    <td>{game.rating} / 5</td>
                                    <td>
                                        {game.platforms.map(p => p.platform.name).join(', ')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}