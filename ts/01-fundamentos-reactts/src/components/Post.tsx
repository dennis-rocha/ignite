import { format, formatDistanceToNow } from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from './Post.module.css';

interface PostProps {
    author: {
        name: string;
        role: string;
        avatarUrl: string;
    },
    publishedAt: Date,
    content: {
        type: 'paragraph' | 'link';
        content: string;
    }[]
}

export function Post({author, publishedAt, content}: PostProps) {
    const [comments, setComments] = useState(['Post muito bacana, hein?!']);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event:FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText])

        setNewCommentText('')
    }

    function handleDeleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
       setNewCommentText(event.target.value)       
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentsForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                name="comment" 
                value={newCommentText}
                placeholder="Deixe um comentário"
                onChange={handleNewCommentChange} />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment 
                                key={comment} 
                                comment={comment} 
                                onDeleteComment={handleDeleteComment} 
                            />
                })}
            </div>
        </article>
    )
}