function Save() {
    return (
        <div>
            <form action="/board/save" method="post">
                Writer : <input type="text" name="boardWriter" /> <br/>
                pw : <input type="password" name="boardPass" /> <br/>
                Title : <input type="text" name="boardTitle" /> <br/>
                Content : <textarea name="boardContent" cols ="30" rows ="10"></textarea> <br/>
                <input type="submit" value="Save"></input>
            </form>
        </div>
    )
}
export default Save;
