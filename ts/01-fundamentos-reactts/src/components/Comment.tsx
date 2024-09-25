import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'

export function Comment({comment, onDeleteComment}) {
    
    const [likesCount , setLikesCount] = useState(0)
    
    function handleDeleteComment() {
        onDeleteComment(comment)
    }

    function handleLikesCount() {
        setLikesCount((state) => {
            return state + 1
        });
    }

    return (    
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/dennis-rocha.png" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Dennis Rocha</strong>
                            <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Cerca de 1h atraás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{comment}</p>
                </div>

                <footer>
                    <button onClick={handleLikesCount}>
                        <ThumbsUp />
                        Aplaudir <span>{likesCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}