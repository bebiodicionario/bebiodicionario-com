import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

export default function Random() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/posts-metadata.json')
            .then((response) => response.json())
            .then((posts) => {
                if (posts.length > 0) {
                    const randomPost = posts[Math.floor(Math.random() * posts.length)];
                    history.push(randomPost.url);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Failed to fetch random posts', err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout title="Post Aleatório" description="Redirecionando para um post aleatório...">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '20px',
                }}>
                {loading ? 'Sorteando um post...' : 'Não foi possível encontrar posts.'}
            </div>
        </Layout>
    );
}
