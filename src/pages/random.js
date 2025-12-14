import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
// Import the generated JSON list
import posts from './posts.json';

export default function Random() {
    const history = useHistory();

    useEffect(() => {
        if (posts && posts.length > 0) {
            // Pick a random post
            const randomIndex = Math.floor(Math.random() * posts.length);
            const randomPost = posts[randomIndex];

            // Redirect
            history.push(randomPost);
        }
    }, [history]);

    return (
        <Layout title="Random Post" description="Redirecting to a random definition...">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '20px',
                }}>
                <p>Girando a garrafa... 🍾</p>
            </div>
        </Layout>
    );
}
