
global.save_log_file = (file_name, text) => {
    if(text === Object){
        //console.log('I-kkkkkk');
    }
    const message = `${get_time} ${JSON.stringify(text)} \n`
    const save_part = `./log/${file_name}_${get_date}.log`
    
    fs.appendFile(save_part, message, function (err) {
        if (err) throw err;
        console.log('Saved!');
    })
}