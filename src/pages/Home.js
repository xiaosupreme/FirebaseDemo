import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import EditIcon from '../assets/edit.png';
import './Home.css';

export default function Home({ user }) {
  const [articles, setArticles] = useState(null);
  const [editArticle, setEditArticle] = useState(null);

  useEffect(() => {
    const ref = collection(db, 'articles');

    getDocs(ref)
      .then((snapshot)=>{
        let results = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setArticles(results);
      })    
  },[])

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
    await deleteDoc(ref);
    window.location.reload();
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    
    try {
      const ref = doc(db, 'articles', id);
      await updateDoc(ref, editArticle);
      window.location.reload();
      setEditArticle(null);
      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === id ? { ...article, ...editArticle } : article
          
        )
      );
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const showEditForm = (article) => {
    setEditArticle(article);
  };

  return (
    <div className="home">
      <h2>Articles</h2>      
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          {user && (
            <>
          <img className="icon" onClick={() => handleDelete(article.id)} src={DeleteIcon} alt="delete icon" />
          
            <img className='icon' onClick={() => showEditForm(article)} src={EditIcon} alt="Edit icon"/>
            </>
          )}
        </div>
      ))}

      {editArticle && user && ( 
        <div className="edit-form">
          <div className="create2">
            <h3>Edit Article</h3>
            <form onSubmit={(e) => handleUpdate(e, editArticle.id)}>
              <label>
                <span>Title:</span>
                <input
                  type="text"
                  value={editArticle.title}
                  onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
                />
              </label>
              <label>
                <span>Author:</span>
                <input
                  type="text"
                  value={editArticle.author}
                  onChange={(e) => setEditArticle({ ...editArticle, author: e.target.value })}
                />
              </label>
              <label>
                <span>Description:</span>
                <textarea
                  value={editArticle.description}
                  onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })}
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditArticle(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
