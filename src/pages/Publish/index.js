import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState, useRef } from 'react'
import { request } from '@/utils/request'
import { message } from 'antd'

const { Option } = Select


const Publish = () => {
    const onFinish = async (formValue) => {
        console.log(formValue)
        if (imageType != imageList.length) {
            return message.error('请上传正确数量的图片')
        }
        const { channel_id, content, title } = formValue
        const params = {
            channel_id,
            content,
            title,
            type: imageType,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url)
            }
        }
        await request.post('/mp/articles?draft=false', params)
        message.success('发布文章成功')
    }
    const cacheImageList = useRef([])

    const [imageType, setImageType] = useState(1)
    const onTypeChange = e => {
        setImageType(e.target.value)
    }
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        console.log(info)
        setImageList(info.fileList)
        cacheImageList.current = info.fileList
    }
    const onRadioChange = (e) => {
        const type = e.target.value
        setImageType(type)
        console.log(type)
        if (type == 1) {
            // 单图，截取第一张展示
            const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
            console.log(imgList)
            setImageList(imgList)
        } else if (type == 3) {
            // 三图，取所有图片展示
            setImageList(cacheImageList.current)
        }
    }
    const [channels, setChannels] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await request.get('/channels')
            setChannels(res.data.channels)
        }
        fetchData()
    }, [])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 200 }}>
                            {channels.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type" onChange={onRadioChange}>
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                maxCount={imageType}
                                multiple={imageType > 1}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish