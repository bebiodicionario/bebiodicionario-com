import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
// Import defaults to handle potential JSON module quirks depending on bundler config, but standard import usually works for array
import postList from './posts.json';

export default function Random() {
    const history = useHistory();

    useEffect(() => {
        // Filter out posts with ID <= 73 based on the filename convention /docs/arquivo/YYYY/BOD###
        const validPosts = postList.filter(path => {
            const match = path.match(/BOD(\d+)/);
            if (match) {
                const number = parseInt(match[1], 10);
                return number > 73;
            }
            return false; // exclude if no BOD number found (e.g. introducao)
        });

        if (validPosts.length > 0) {
            const randomPost = validPosts[Math.floor(Math.random() * validPosts.length)];
            history.push(randomPost);
        } else {
            // Fallback if filter removes everything
            history.push('/');
        }
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
                    fontFamily: 'Work Sans, sans-serif'
                }}>
                Sorteando um post...
            </div>
        </Layout>
    );
}