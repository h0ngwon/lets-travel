import React, { useState, useEffect } from 'react';
import { db } from 'firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import CountryBtn from './ui/CountryBtn';
import { useDispatch, useSelector } from 'react-redux';

function Comments() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const activeCountry = useSelector((state) => state.countrySlice);
    const dispatch = useDispatch();
    const [contents, setContents] = useState('');
    const [comments, setComments] = useState([]);
    const countries = [
        '일본',
        '베트남',
        '호주',
        '미국',
        '캐나다',
        '프랑스',
        '영국',
        '이집트',
    ];
    // console.log(comments)


    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        // dispatch(setCountry(e.target.value));
    };

    const onChangeHandler = (e) => {
        setContents(e.target.value);
    }
    
    const deleteBtnHandler= async (comment) => {
        console.log("삭제버튼",comment)
        // const ref = doc(db, 'comments', comment.id);
        await deleteDoc(doc(db, 'comments', comment.id));
        // let temp = comments.filter((comment)=> comment.id!==comment.id);
        // setComments(temp)
        setComments((prev) => {
            return prev.filter((element) => element.id !== comment.id);
          });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const docRef = collection(db, 'comments');
        const newComment = {
           contents,
           country: selectedCountry,
           createdAt: new Date().toLocaleString(),
           key:nanoid(),
           userEmail: 'test@test.com',
        };
        addDoc(docRef, newComment)
        setComments([newComment,...comments])
    };

    //처음 컴포넌트가 렌더링 되면 서버에서 데이터를 받아와 state에 저장
    useEffect(() => {
        const fetchData =async () => {
          
          const q = query(collection(db, "comments"));
          const querySnapshot = await getDocs(q);
    
          const initialComments = [];
    
          querySnapshot.forEach((doc) => {
            initialComments.push({ id: doc.id, ...doc.data() });
          });
    
               
          setComments(initialComments);
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <CountryBtn
                countries={countries}
            />
            <div>
                <select onChange={handleCountryChange} value={selectedCountry}>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>

                <form>
                    <input 
                        type='text'
                        placeholder='댓글을 입력하세요'
                        onChange={onChangeHandler}
                        value={contents}
                    />
                    <button onClick={onSubmit}>등록</button>
                </form>
            </div>

            <h4>댓글창</h4>
            <br />
            <br />
            {comments
            .filter((value) => {
                return value.country == activeCountry;
            })
            .map((comment) => (
                <div key={comment.key}>
                    <div>
                        <p>{comment.userEmail}</p>
                        <p>{comment.createdAt}</p> 
                    </div>
                    <p>{comment.contents}</p>
                    <button onClick={()=>{deleteBtnHandler(comment)}}>삭제</button>
                </div>
            ))}
        </div>
    );
}

export default Comments;
