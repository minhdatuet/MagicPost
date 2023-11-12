import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div class="footer-clean">
        <footer>
            <div class="container">
                <div class="rowCenter">
                    <div class="colItem1">
                        <h3>Dịch vụ</h3>
                        <ul>
                            <li><a href="#">Chuyển phát</a></li>
                            <li><a href="#">Theo dõi hàng hóa</a></li>
                            <li><a href="#">Hỗ trợ khách hàng</a></li>
                        </ul>
                    </div>
                    <div class="colItem2">
                        <h3>Chúng tôi</h3>
                        <ul>
                            <li><a href="#">Công ty</a></li>
                            <li><a href="#">Nhóm </a></li>
                            <li><a href="#">Kinh tế</a></li>
                        </ul>
                    </div>
                    <div class="colItem3">
                        <h3>Địa điểm làm việc</h3>
                        <ul>
                            <li><a href="#">Kho hàng</a></li>
                            <li><a href="#">Điểm giao dịch</a></li>
                            <li><a href="#">Website</a></li>
                        </ul>
                    </div>
                </div>
                <div class="item social">
                      <a href = "https://www.facebook.com/">
                        <i class="fa fa-facebook icon"></i>
                      </a>
                      <a href = "https://www.instagram.com/">
                        <i class="fa fa-instagram icon"></i>
                      </a>
                      <a href = "https://www.youtube.com/">
                        <i class="fa fa-youtube icon"></i>
                      </a>
                </div>
                <p class="copyright">Magic Post 2023</p>
            </div>
        </footer>
    </div>
  )
}
export default Footer